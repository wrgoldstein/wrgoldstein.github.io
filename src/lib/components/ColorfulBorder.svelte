<script>
	import { Tween } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';

  let { children } = $props()

  function arange(start, stop, step) {
  // Check if only one argument is provided
  if (stop === undefined) {
    stop = start;
    start = 0;
  }

  // Set default step to 1 if not provided
  step = step || 1;

  // Calculate the length of the array
  const length = Math.max(Math.ceil((stop - start) / step), 0);

  // Create an array of the desired length
  const range = Array(length);

  // Fill the array with values based on the start, stop, and step
  for (let i = 0; i < length; i++, start += step) {
    range[i] = start;
  }

  return range;
}

const offset0 = new Tween(0, { easing: cubicInOut })
const offset1 = new Tween(10, { easing: cubicInOut })

$effect.root(() => {
  setTimeout(() => {
    offset0.target = 10
    offset1.target = 0
  }, 300)
  
})

</script>

<div class="w-screen h-screen overflow-scroll">
  <svg class="w-full h-full absolute top-0 left-0 z-[-1]" viewBox="-250 -150 500 300">
    <rect fill="lightpink" x="-405" y="-150" width="1000" height="1000"></rect>
    {#each [...arange(-450, 450, 20)] as cx, i}
      {#each arange(-150, 300, 20) as cy, k}
        <circle cx={k % 2 == 0 ? cx + offset0.current : cx + offset1.current} {cy} r=8 fill="yellow"></circle>
      {/each}
    {/each}
  </svg>
  <div class="mx-24 my-24 bg-white z-1 h-full p-24">
    {@render children?.()}
  </div>
</div>