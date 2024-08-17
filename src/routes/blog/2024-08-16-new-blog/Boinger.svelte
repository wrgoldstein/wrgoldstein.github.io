<script>
  let A = $state(50) // amplitude
  let f = $state(1) // ordinary frequency
  let p = $state(0) // phase

  const x = [...Array(1000).keys()].map(i => i / 50)

  let Y = $derived(
    x.map(t0 => A*Math.sin(2*Math.PI*f*t0 + p))
  )

  let d = $derived.by(() => {
    return "M" + x.map((x0, i) => `${x0 * 100} ${Y[i] + 0.5*A}`).join("L")
  })

</script>

<div class="flex gap-3 m-2">
  <div class="place-content-evenly">
    Amplitude 
    <input type="range" bind:value={A}>
  </div>
  <div class="place-content-evenly">
    Frequency 
    <input type="range" bind:value={f} min="1" max="10" step="0.2">
  </div>
</div>

<svg viewBox="0 -100 1000 250" class="mx-auto mt-6 w-3/4">
  <path d={d} fill="none" stroke="maroon" stroke-width="4" stroke-linecap="round"></path>
</svg>
