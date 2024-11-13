<script>
	const {
		cx,
		cy,
		r,
		delay,
		duration,
		time,
		draw = 'regular',
		hold,
		resetAfter,
		stroke = 'white',
		strokeWidth = 2,
		fill = 'none',
		strokeDasharray = 'none'
	} = $props();

	import { fade } from 'svelte/transition';

	const N = 1000;

	let points = new Array(N)
		.fill()
		.map((_, i) => 2 * Math.PI * (i / N))
		.map((i) => {
			return `L${cx + r * Math.cos(i)} ${cy + r * Math.sin(i)}`;
		});

	const reversed = draw === 'reversed';
	points = reversed ? points.reverse() : points;

	points[0] = points[0].replace('L', 'M');

	let frac = $derived.by(() => {
		if (draw == 'none') return N;
		if (time <= delay) return 0;
		if (time > delay + duration + hold + 5) return 0;
		let _frac = (N * (time - delay)) / duration;
		return reversed ? 1 - _frac : _frac;
	});

	let d = $derived(points.slice(0, frac).join(' '));
</script>

{#if time > delay && time < delay + duration}
	<path
		transition:fade
		{d}
		{stroke}
		{fill}
		stroke-dasharray={strokeDasharray}
		stroke-linecap="square"
		stroke-width={strokeWidth}
	>
	</path>
{/if}
