<script>
  /**
   * Luminance histogram with a draggable threshold line.
   *
   * Props:
   *   imageData  — raw ImageData (RGBA)
   *   channel    — 'luminance' | 'average' | 'red'
   *   threshold  — current cut value 0–255
   *   onchange   — called with new threshold when user drags the line
   */
  const { imageData, channel, threshold, onchange } = $props();

  // ── compute histogram whenever imageData or channel changes ───────────
  let bins = $derived.by(() => {
    if (!imageData) return new Float32Array(256);

    const { data, width, height } = imageData;
    const counts = new Float32Array(256);
    const n = width * height;

    for (let i = 0; i < n; i++) {
      const r = data[i*4], g = data[i*4+1], b = data[i*4+2], a = data[i*4+3];
      if (a < 128) continue; // skip transparent
      let v;
      switch (channel) {
        case 'luminance': v = 0.299*r + 0.587*g + 0.114*b; break;
        case 'average':   v = (r + g + b) / 3; break;
        case 'red':       v = r; break;
        default:          v = 0.299*r + 0.587*g + 0.114*b;
      }
      counts[Math.min(255, v | 0)]++;
    }

    // Normalise to [0,1] using the 99th-percentile peak so bright outlier
    // buckets don't squash the rest of the histogram.
    const sorted = [...counts].sort((a,b) => a - b);
    const p99    = sorted[Math.floor(sorted.length * 0.99)] || 1;
    const out    = new Float32Array(256);
    for (let i = 0; i < 256; i++) out[i] = Math.min(1, counts[i] / p99);
    return out;
  });

  // ── canvas drawing ─────────────────────────────────────────────────────
  const W = 256, H = 64;
  let canvas = $state(null);

  $effect(() => {
    if (!canvas) return;
    draw(canvas, bins, threshold);
  });

  function draw(cvs, bins, thresh) {
    cvs.width  = W;
    cvs.height = H;
    const ctx  = cvs.getContext('2d');
    ctx.clearRect(0, 0, W, H);

    // background split: left of threshold = darker tint (foreground side)
    ctx.fillStyle = 'rgba(0,0,0,0.04)';
    ctx.fillRect(0, 0, thresh, H);
    ctx.fillStyle = 'rgba(255,255,255,0)';
    ctx.fillRect(thresh, 0, W - thresh, H);

    // bars
    for (let i = 0; i < 256; i++) {
      const h = Math.ceil(bins[i] * H);
      ctx.fillStyle = i < thresh ? '#374151' : '#d1d5db';
      ctx.fillRect(i, H - h, 1, h);
    }

    // threshold line
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(thresh + 0.5, 0);
    ctx.lineTo(thresh + 0.5, H);
    ctx.stroke();

    // label
    ctx.fillStyle   = '#ef4444';
    ctx.font        = '9px monospace';
    ctx.textAlign   = thresh > 200 ? 'right' : 'left';
    ctx.fillText(thresh, thresh + (thresh > 200 ? -3 : 3), 10);
  }

  // ── drag interaction ───────────────────────────────────────────────────
  let dragging = false;

  function toValue(clientX) {
    const rect = canvas.getBoundingClientRect();
    const x    = clientX - rect.left;
    return Math.max(0, Math.min(255, Math.round(x * 256 / rect.width)));
  }

  function onPointerDown(e) {
    dragging = true;
    canvas.setPointerCapture(e.pointerId);
    onchange(toValue(e.clientX));
  }
  function onPointerMove(e) {
    if (!dragging) return;
    onchange(toValue(e.clientX));
  }
  function onPointerUp() { dragging = false; }
</script>

<div class="space-y-1">
  <canvas
    bind:this={canvas}
    width={W} height={H}
    style="width:100%; height:{H}px; cursor:ew-resize; display:block"
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
  ></canvas>
  <p class="text-xs text-gray-400">
    drag the <span class="text-red-400">red line</span> to set threshold ·
    dark bars = foreground
  </p>
</div>
