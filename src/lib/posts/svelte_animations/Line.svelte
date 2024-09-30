<script>
  import { clamp } from "./utils.js"

  const {
    x0,
    y0,
    x2,
    y2,
    delay,
    duration,
    time,
    stroke,
    strokeDashArray,
    strokeWidth,
  } = $props();

  let frac = $derived(clamp((time - delay) / duration, 0, 1))
  let x1 = $derived(x0 + (x2 - x0) * frac)
  let y1 = $derived(y0 + (y2 - y0) * frac)
</script>

{#if frac > 0}
  <line
    x1={x0}
    y1={y0}
    x2={x1}
    y2={y1}
    {stroke}
    stroke-dasharray={strokeDashArray}
    stroke-linecap="square"
    stroke-width={strokeWidth}
  >
</line>
{/if}