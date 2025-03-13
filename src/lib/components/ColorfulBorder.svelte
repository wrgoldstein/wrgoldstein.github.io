<script>
	import { Tween } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';

  let { children } = $props();
  let contentDiv;

  function arange(start, stop, step) {
    if (stop === undefined) {
      stop = start;
      start = 0;
    }
    step = step || 1;
    const length = Math.max(Math.ceil((stop - start) / step), 0);
    const range = Array(length);
    for (let i = 0; i < length; i++, start += step) {
      range[i] = start;
    }
    return range;
  }

  let offset0 = $state(new Tween(0, { easing: cubicInOut }))
  let offset1 = $state(new Tween(10, { easing: cubicInOut }))

  $effect.root(() => {
    setTimeout(() => {
      offset0.target = 10;
      offset1.target = 0;
    }, 300);
  });
</script>

<div class="relative min-h-screen">
  <svg class="absolute top-0 left-0 w-full h-full z-[-1]" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
    <rect fill="lightpink" x="-100" y="-100" width="1200" height="800"></rect>
    {#each [...arange(-50, 1050, 20)] as cx, i}
      {#each arange(-50, 650, 10) as cy, k}
        <circle cx={k % 2 == 0 ? cx + offset0.current : cx + offset1.current} cy={cy} r="3" fill="yellow"></circle>
      {/each}
    {/each}
  </svg>
  <div class="p-12" bind:this={contentDiv}>
    <div class="bg-white p-12 min-h-[32rem]">
      {@render children?.()}
    </div>
  </div>
</div>