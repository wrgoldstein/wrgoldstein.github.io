<script>
  import { runPipeline } from '$lib/potrace/pipeline.js';
  import Param from '$lib/potrace/Param.svelte';
  import Histogram from '$lib/potrace/Histogram.svelte';

  // ── image ──────────────────────────────────────────────────────────────
  /** @type {ImageData|null} */
  let imageData = $state(null);
  let imageSrc  = $state(null);

  // ── params ─────────────────────────────────────────────────────────────
  let threshold       = $state(128);
  let channel         = $state('luminance');
  let epsilon         = $state(2.0);
  let cornerThreshold = $state(-0.5);
  let maxError        = $state(1.0);
  let maxDepth        = $state(4);

  // ── pipeline output ────────────────────────────────────────────────────
  // One final snapshot per stage, keyed by stage name.
  /** @type {Record<string, import('$lib/potrace/types').PipelineState>} */
  let stageSnapshots = $state({});
  let running = $state(false);
  let runMs   = $state(0);

  // ── UI selection ───────────────────────────────────────────────────────
  let selectedStage = $state('svg');   // which stage panel is expanded
  let selectedIdx   = $state(-1);      // which item within that stage (-1 = all)

  // ── auto-run on param change ───────────────────────────────────────────
  let debounceTimer = null;
  $effect(() => {
    void threshold; void channel; void epsilon;
    void cornerThreshold; void maxError; void maxDepth;
    if (imageData) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(runAll, 150);
    }
  });

  function onFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    imageSrc = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const MAX = 512;
      let w = img.naturalWidth, h = img.naturalHeight;
      if (w > MAX || h > MAX) {
        const scale = MAX / Math.max(w, h);
        w = Math.round(w * scale); h = Math.round(h * scale);
      }
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      imageData = c.getContext('2d').getImageData(0, 0, w, h);
    };
    img.src = imageSrc;
  }

  function runAll() {
    if (!imageData) return;
    running = true;
    setTimeout(() => {
      const t0  = performance.now();
      const out = {};
      for (const s of runPipeline(imageData, {
        threshold, channel, epsilon, cornerThreshold, maxError, maxDepth,
      })) {
        if (s._done) out[s._stage] = s;
      }
      stageSnapshots = out;
      runMs   = Math.round(performance.now() - t0);
      running = false;
      selectedIdx = -1;
    }, 0);
  }

  // ── stage metadata ─────────────────────────────────────────────────────
  const STAGES = [
    {
      id: 'threshold',
      label: 'Threshold',
      color: '#6366f1',   // indigo
      describe: s => s?.bitmap
        ? `${[...s.bitmap.data].filter(v=>v===1).length} fg px`
        : '—',
      items: () => [],    // no sub-items
    },
    {
      id: 'trace',
      label: 'Trace',
      color: '#ef4444',   // red
      describe: s => s?.contours ? `${s.contours.length} contours` : '—',
      items: s => s?.contours ?? [],
      itemLabel: (c, i) => `${c.isHole ? 'hole' : 'outer'} · ${c.points.length} pts`,
    },
    {
      id: 'simplify',
      label: 'Simplify',
      color: '#f97316',   // orange
      describe: s => s?.polygons
        ? `${s.polygons.length} polygons · ${s.polygons.reduce((n,p)=>n+p.points.length,0)} pts total`
        : '—',
      items: s => s?.polygons ?? [],
      itemLabel: (p, i) => `${p.isHole ? 'hole' : 'outer'} · ${p.points.length} pts`,
    },
    {
      id: 'bezier',
      label: 'Bézier fit',
      color: '#22c55e',   // green
      describe: s => {
        if (!s?.paths) return '—';
        const segs   = s.paths.reduce((n,p)=>n+p.segments.length, 0);
        const curves = s.paths.reduce((n,p)=>n+p.segments.filter(sg=>sg.type==='curve').length, 0);
        return `${s.paths.length} paths · ${segs} segs (${curves} curves)`;
      },
      items: s => s?.paths ?? [],
      itemLabel: (p, i) => {
        const curves = p.segments.filter(s=>s.type==='curve').length;
        return `${p.isHole ? 'hole' : 'outer'} · ${p.segments.length} segs (${curves}c)`;
      },
    },
    {
      id: 'svg',
      label: 'SVG',
      color: '#0ea5e9',   // sky
      describe: s => s?.svg ? `${s.svg.length} chars` : '—',
      items: () => [],
    },
  ];

  // ── canvas rendering ───────────────────────────────────────────────────

  /**
   * Draw a stage snapshot to a canvas element.
   * highlightIdx = -1 means draw all items; ≥0 means only that item.
   */
  function drawToCanvas(canvas, snapshot, highlightIdx = -1) {
    if (!canvas || !snapshot?.bitmap) return;
    const { bitmap, contours, polygons, paths, _stage } = snapshot;

    canvas.width  = bitmap.width;
    canvas.height = bitmap.height;

    const W = canvas.parentElement?.clientWidth ?? bitmap.width;
    const scale = Math.max(1, Math.min(6, Math.floor(W / bitmap.width)));
    canvas.style.width  = `${bitmap.width  * scale}px`;
    canvas.style.height = `${bitmap.height * scale}px`;

    const ctx = canvas.getContext('2d');

    // bitmap background
    const img = ctx.createImageData(bitmap.width, bitmap.height);
    for (let i = 0; i < bitmap.data.length; i++) {
      const v = bitmap.data[i] === 1 ? 20 : 245;
      img.data[i*4]=v; img.data[i*4+1]=v; img.data[i*4+2]=v; img.data[i*4+3]=255;
    }
    ctx.putImageData(img, 0, 0);

    const lw = Math.max(0.5, 1 / scale);

    function drawPolyline(pts, stroke, close=true) {
      if (!pts?.length) return;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      if (close) ctx.closePath();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lw;
      ctx.stroke();
    }

    function drawPath(path, stroke) {
      if (!path.segments.length) return;
      ctx.beginPath();
      ctx.moveTo(path.segments[0].p0.x, path.segments[0].p0.y);
      for (const seg of path.segments) {
        if (seg.type === 'line') {
          ctx.lineTo(seg.p3.x, seg.p3.y);
        } else {
          ctx.bezierCurveTo(seg.c1.x,seg.c1.y,seg.c2.x,seg.c2.y,seg.p3.x,seg.p3.y);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lw;
      ctx.stroke();
    }

    if (_stage === 'trace') {
      const list = contours ?? [];
      list.forEach((c, i) => {
        if (highlightIdx >= 0 && i !== highlightIdx) return;
        const alpha = highlightIdx >= 0 ? 1 : 0.7;
        const color = c.isHole ? `rgba(96,165,250,${alpha})` : `rgba(248,113,113,${alpha})`;
        drawPolyline(c.points, color);
      });
    }

    if (_stage === 'simplify') {
      const list = polygons ?? [];
      list.forEach((p, i) => {
        if (highlightIdx >= 0 && i !== highlightIdx) return;
        const alpha = highlightIdx >= 0 ? 1 : 0.7;
        const color = p.isHole ? `rgba(96,165,250,${alpha})` : `rgba(249,115,22,${alpha})`;
        drawPolyline(p.points, color);
        // draw vertices as dots
        if (highlightIdx === i) {
          ctx.fillStyle = color;
          for (const pt of p.points) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.5/scale, 0, Math.PI*2);
            ctx.fill();
          }
        }
      });
    }

    if (_stage === 'bezier' || _stage === 'svg') {
      const list = paths ?? [];
      list.forEach((p, i) => {
        if (highlightIdx >= 0 && i !== highlightIdx) return;
        const alpha = highlightIdx >= 0 ? 1 : 0.7;
        const color = p.isHole
          ? `rgba(167,139,250,${alpha})`
          : `rgba(34,197,94,${alpha})`;
        drawPath(p, color);

        // when selected, also draw control points
        if (highlightIdx === i) {
          for (const seg of p.segments) {
            if (seg.type !== 'curve') continue;
            ctx.strokeStyle = 'rgba(251,191,36,0.8)';
            ctx.lineWidth = lw * 0.7;
            // c1 arm
            ctx.beginPath();
            ctx.moveTo(seg.p0.x, seg.p0.y);
            ctx.lineTo(seg.c1.x, seg.c1.y);
            ctx.stroke();
            // c2 arm
            ctx.beginPath();
            ctx.moveTo(seg.p3.x, seg.p3.y);
            ctx.lineTo(seg.c2.x, seg.c2.y);
            ctx.stroke();
            // dots
            ctx.fillStyle = 'rgba(251,191,36,0.9)';
            for (const pt of [seg.c1, seg.c2]) {
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, 1.5/scale, 0, Math.PI*2);
              ctx.fill();
            }
          }
        }
      });
    }
  }

  // ── canvas action: bind a canvas to a stage + re-draw on state change ──
  function stageCanvas(node, stageId) {
    function redraw() {
      drawToCanvas(node, stageSnapshots[stageId], -1);
    }
    redraw();
    return { update: redraw, destroy() {} };
  }

  // ── detail canvas (large, shows selected item) ─────────────────────────
  let detailCanvas = $state(null);

  $effect(() => {
    if (!detailCanvas) return;
    const snap = stageSnapshots[selectedStage];
    if (!snap) return;
    drawToCanvas(detailCanvas, snap, selectedIdx);
  });

  // ── derived: items list for selected stage ──────────────────────────────
  let selectedStageMeta = $derived(STAGES.find(s => s.id === selectedStage));
  let selectedItems     = $derived(
    selectedStageMeta?.items(stageSnapshots[selectedStage]) ?? []
  );
</script>

<!-- ════════════════════════════════════════════════════════════════════ -->

<div class="max-w-5xl mx-auto px-4 py-8 font-mono text-sm">
  <h1 class="text-lg font-bold tracking-tight mb-6">potrace</h1>

  <div class="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 items-start">

    <!-- ═══════════════ LEFT: controls ═══════════════ -->
    <aside class="space-y-4 md:sticky md:top-6">

      <!-- Image -->
      <div class="space-y-2">
        <p class="text-xs font-semibold uppercase tracking-widest text-gray-400">Image</p>
        <input type="file" accept="image/*" onchange={onFileChange}
          class="w-full text-xs file:mr-2 file:border file:rounded file:px-2 file:py-1
                 file:text-xs file:bg-white file:cursor-pointer" />
        {#if imageSrc}
          <img src={imageSrc} alt="source"
               class="w-full border border-gray-200 rounded" style="image-rendering:pixelated" />
          {#if imageData}
            <p class="text-xs text-gray-400 tabular-nums">{imageData.width}×{imageData.height}</p>
          {/if}
        {/if}
      </div>

      <!-- Stage 1 -->
      <fieldset class="border-l-2 pl-3 space-y-3" style="border-color:#6366f1">
        <legend class="text-xs font-semibold text-gray-500 mb-1">1 · threshold</legend>
        <div class="space-y-1">
          <p class="text-xs text-gray-500">channel</p>
          <div class="flex gap-1">
            {#each ['luminance','average','red'] as ch}
              <button onclick={() => channel = ch}
                class="px-1.5 py-0.5 border rounded text-xs transition-colors
                       {channel===ch ? 'bg-black text-white border-black' : 'hover:bg-gray-50'}"
              >{ch}</button>
            {/each}
          </div>
        </div>
        {#if imageData}
          <Histogram
            {imageData}
            {channel}
            {threshold}
            onchange={v => threshold = v}
          />
        {:else}
          <Param label="cutoff" value={threshold} min={0} max={255} step={1}
                 hint="Pixels darker than this → foreground"
                 set={v => threshold = v} />
        {/if}
      </fieldset>

      <!-- Stage 3 -->
      <fieldset class="border-l-2 pl-3 space-y-3" style="border-color:#f97316">
        <legend class="text-xs font-semibold text-gray-500 mb-1">3 · simplify</legend>
        <Param label="RDP ε" value={epsilon} min={0.1} max={10} step={0.1}
               hint="Max deviation when dropping collinear points. Higher → blockier, fewer vertices."
               set={v => epsilon = v} />
      </fieldset>

      <!-- Stage 4 -->
      <fieldset class="border-l-2 pl-3 space-y-3" style="border-color:#22c55e">
        <legend class="text-xs font-semibold text-gray-500 mb-1">4 · bézier</legend>
        <Param label="corner cos θ" value={cornerThreshold} min={-1} max={1} step={0.05}
               hint="Turning-angle cosine below this = corner (line). −1 = all curves, +1 = all lines."
               set={v => cornerThreshold = v} />
        <Param label="max error" value={maxError} min={0.1} max={10} step={0.1}
               hint="Max RMS fit error (px) before splitting an arc. Lower → smoother, more segments."
               set={v => maxError = v} />
        <Param label="max depth" value={maxDepth} min={0} max={8} step={1}
               hint="Recursion depth when splitting a bad fit."
               set={v => maxDepth = v} />
      </fieldset>

      <!-- Run status -->
      <p class="text-xs text-gray-400 tabular-nums h-4">
        {#if running}<span class="animate-pulse">running…</span>
        {:else if runMs > 0}{runMs} ms{/if}
      </p>
    </aside>

    <!-- ═══════════════ RIGHT: stage panels ═══════════════ -->
    <main class="space-y-3 min-w-0">

      {#each STAGES as stage}
        {@const snap = stageSnapshots[stage.id]}
        {@const isSelected = selectedStage === stage.id}

        <!-- Stage card -->
        <div class="border border-gray-200 rounded overflow-hidden
                    {isSelected ? 'ring-2 ring-offset-1' : ''}"
             style={isSelected ? `--tw-ring-color:${stage.color}` : ''}>

          <!-- Header — always visible, click to select -->
          <button
            class="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50
                   border-b border-gray-100 transition-colors"
            onclick={() => { selectedStage = stage.id; selectedIdx = -1; }}
          >
            <span class="w-2 h-2 rounded-full shrink-0" style="background:{stage.color}"></span>
            <span class="font-semibold text-xs">{stage.label}</span>
            <span class="text-xs text-gray-400 ml-auto tabular-nums">
              {snap ? stage.describe(snap) : (running ? '…' : '—')}
            </span>
            <span class="text-gray-300 text-xs">{isSelected ? '▲' : '▼'}</span>
          </button>

          {#if isSelected && snap}
            <div class="grid grid-cols-1 sm:grid-cols-[1fr_180px] gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">

              <!-- Detail canvas -->
              <div class="p-3 bg-gray-50 flex justify-center items-start overflow-auto">
                <canvas
                  bind:this={detailCanvas}
                  style="image-rendering:pixelated; max-width:100%"
                ></canvas>
              </div>

              <!-- Item list -->
              {#if selectedItems.length > 0}
                <div class="overflow-y-auto max-h-80">
                  <!-- "All" row -->
                  <button
                    class="w-full text-left px-3 py-1.5 text-xs border-b border-gray-100 transition-colors
                           {selectedIdx === -1 ? 'bg-black text-white' : 'hover:bg-gray-50'}"
                    onclick={() => selectedIdx = -1}
                  >all ({selectedItems.length})</button>

                  {#each selectedItems as item, i}
                    <button
                      class="w-full text-left px-3 py-1.5 text-xs border-b border-gray-100
                             transition-colors tabular-nums
                             {selectedIdx === i ? 'bg-black text-white' : 'hover:bg-gray-50'}"
                      onclick={() => selectedIdx = i}
                    >
                      <span class="mr-1" style="color:{selectedIdx===i ? 'white' : stage.color}">■</span>
                      {i+1}. {selectedStageMeta.itemLabel(item, i)}
                    </button>
                  {/each}
                </div>
              {:else if stage.id === 'svg' && snap?.svg}
                <!-- SVG stage: show source + download -->
                <div class="p-3 space-y-2 overflow-auto max-h-80">
                  <button
                    onclick={() => {
                      const blob = new Blob([snap.svg], { type:'image/svg+xml' });
                      const a = document.createElement('a');
                      a.href = URL.createObjectURL(blob);
                      a.download = 'traced.svg';
                      a.click();
                    }}
                    class="w-full px-2 py-1 border rounded text-xs hover:bg-gray-50"
                  >↓ download SVG</button>
                  <pre class="text-xs leading-relaxed overflow-auto whitespace-pre-wrap break-all">{snap.svg}</pre>
                </div>
              {/if}

            </div>
          {/if}

        </div>
      {/each}

    </main>
  </div>
</div>


