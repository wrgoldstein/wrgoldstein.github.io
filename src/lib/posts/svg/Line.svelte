<script>
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

  function clamp(num, min, max) {
    return num <= min 
      ? min 
      : num >= max 
        ? max 
        : num
  }

  let frac = $derived(clamp((time - delay) / duration, 0, 1))
  let x1 = $derived.by(() => { return x0 + (x2 - x0) * frac })
  let y1 = $derived.by(() => { return y0 + (y2 - y0) * frac })

  $effect(() => console.log(frac))
</script>

{#if frac > 0}
  <path
    d="M {x0} {y0} L {x1} {y1}"
    {stroke}
    stroke-dasharray={strokeDashArray}
    stroke-linecap="square"
    stroke-width={strokeWidth}
  >
  </path>
{/if}