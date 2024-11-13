---
layout: post
title: Svelte animations
date: 2024-09-27
---

<script>
  import Circle from "./svelte_animations/Circle.svelte";
  import Line from "./svelte_animations/Line.svelte";
  import { AnimationTimer } from '$lib/components/AnimationTimer.svelte.js'
  let timer = AnimationTimer(5500)

  $effect.root(() => {
    timer.start()
  });
</script>

<svg viewbox="0 0 600 100" class="w-full mt-24 mb-12 mx-auto">
  <path d="M0 50 L 250 50" stroke="#2C5943" stroke-dasharray="0 1 0"></path>
  <path d="M300 50 L 600 50" stroke="#2C5943" stroke-dasharray="0 1 0"></path>

<Line
    x0={0}
    x2={100}
    y0={50}
    y2={50}
    stroke="#2C5943"
    strokeWidth={4}
    time={timer.time}
    delay="0"
    duration={250}
  />

<rect x="100" y="0" width="100" height="100" rx="15" fill="#2C5943"></rect>
<Circle
    cx={150}
    cy={50}
    r={25}
    time={timer.time}
    delay="250"
    duration="500"
    hold="500"
    draw="reversed"
  />
<Circle
    cx={150}
    cy={50}
    r={35}
    time={timer.time}
    delay="750"
    duration="500"
    strokeDasharray="4 4"
  />
<Circle
    cx={150}
    cy={50}
    r={45}
    time={timer.time}
    delay="1250"
    duration="500"
    strokeDasharray="0 4"
  />
<Circle
    cx={150}
    cy={50}
    r={25}
    time={timer.time}
    delay="1750"
    duration="500"
    hold="400"
  />

<Line
    x0={200}
    x2={250}
    y0={50}
    y2={50}
    stroke="#2C5943"
    strokeWidth={4}
    time={timer.time}
    delay=2250
    duration={250}
  />

<rect x="250" y="0" width="100" height="100" rx="15" fill="#2C5943"></rect>
<path d="M300 0 L 300 100" stroke="white" stroke-dasharray="0 1 0"></path>
<path d="M250 50 L 350 50" stroke="white" stroke-dasharray="0 1 0"></path>
<Circle
    cx={300}
    cy={50}
    r={25}
    time={timer.time}
    stroke="none"
    fill="white"
    delay="2500"
    duration="250"
    hold="500"
    draw="none"
  />
<Circle
    cx={300}
    cy={50}
    r={25}
    time={timer.time}
    delay="0"
    duration="4000"
    hold="500"
    draw="none"
  />
<Circle cx={300} cy={50} r={35} time={timer.time} delay="3000" duration="500" />
<Circle
    cx={300}
    cy={50}
    r={45}
    time={timer.time}
    delay="3500"
    duration="500"
    strokeDasharray="0 4"
  />

<Line
    x0={350}
    x2={450}
    y0={50}
    y2={50}
    stroke="#2C5943"
    strokeWidth={4}
    time={timer.time}
    delay=4000
    duration={250}
  />

<rect x="400" y="0" width="100" height="100" rx="15" fill="#2C5943"></rect>
<Circle
    cx={450}
    cy={50}
    r={25}
    time={timer.time}
    delay="0"
    duration="4000"
    hold="500"
    draw="none"
  />
<Circle
    cx={450}
    cy={50}
    r={28}
    time={timer.time}
    delay="4250"
    duration="500"
    hold="500"
    strokeWidth={10}
  />
<Circle
    cx={450}
    cy={50}
    r={45}
    time={timer.time}
    delay="4750"
    duration="500"
    strokeDasharray="0 4"
  />

<Line
    x0={500}
    x2={600}
    y0={50}
    y2={50}
    stroke="#2C5943"
    strokeWidth={4}
    time={timer.time}
    delay=5250
    duration={250}
  />
</svg>

I build [a website recently for work](https://twirldata.com), and as part of that process I got connected to fantastic designer who came up with an awesome vibrant and fun look for the site.

One aspect of her vision was to include lots of fun iconographics and animations, and it turned out she's skilled at making the required 2D renderings in [AfterEffects](https://www.adobe.com/products/aftereffects.html).

The animations were really cool, but the exported gifs weren't always as smooth as I would have liked. We achieved a higher quality of visual by switching from gifs to [lotties](https://lottiefiles.com/), but I had an feeling I could do the visuals with svg animated by javascript and it would render silky smooth.

<svg viewbox="0 0 500 100" class="my-12 mx-auto">rect>
{#each [100, 200, 300, 400] as x}
{#each Array(5).fill().map((_, i) => i*10) as i}
<Circle
cx={x}
cy={50}
r={0.5*i}
time={timer.time}
stroke="#2C5943"
strokeWidth={1}
delay={5*x + 5*i}
duration={500}
hold="500"
draw="none"
/>
{/each}
{/each}
{#each [100, 200, 300, 400] as x}
{#each Array(5).fill().map((_, i) => i*10) as i}
<Circle
cx={x}
cy={50}
r={0.5*i}
time={timer.time}
stroke="#2C5943"
strokeWidth={1}
delay={2000 + 5*x + 5*i}
duration={500}
hold="500"
draw="none"
/>
{/each}
{/each}
</svg>

The idea is basically to define a svelte `$state()` variable containing the timing (how far into a loop we are), and then pass that to child components to compute what they should look like based on their own delay, duration, and shape.

Here's everything I ended up needed for the animation timing (cribbed from [here](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#examples)).

```svelte
<script>
	import { onMount } from 'svelte';

	let zero;
	let time = $state();
	const loop_time = 5_500;

	function firstFrame(timestamp) {
		zero = timestamp;
		animate(timestamp);
	}

	function animate(timestamp) {
		time = timestamp - zero;
		if (time < loop_time) {
			requestAnimationFrame((t) => animate(t));
		} else {
			time = 0;
			setTimeout(() => requestAnimationFrame(firstFrame), 100);
		}
	}

	onMount(() => {
		requestAnimationFrame(firstFrame);
	});
</script>
```

What I like about the example I'm recreating here is it's tight timing and sense of rhythm. To achieve that, we just have a Svelte component that receives the `time` prop from the parent above, and then computes an SVG `<path/>` that corresponds to the desired effect and timing.

<div class="p-4 bg-gray-200">

Note the [svelte/transition](https://svelte.dev/docs/svelte-transition) package has `draw` in it, which achieves much of the same effect by [stroke-dash animation](https://css-tricks.com/svg-line-animation-works/)--- but I wanted my lines to retain their stroke dashes, and also to build towards more complicated shapes that can't be animated with this trick.

</div>

Once you have the timing, Svelte makes the rest really easy.

<svg viewbox="0 0 600 100" class="w-full mx-auto">
  <Line 
    x0={0} x2={600} y0={50} y2={50} stroke="Tomato" 
    strokeWidth={20} strokeDashArray="0 25 0 25 0 25" delay=0 duration=3000 time={timer.time}
  />
  <Line 
    x0={0} x2={600} y0={20} y2={30} stroke="MediumSeaGreen" 
    strokeWidth={20} strokeDashArray="0 0 50 0 25 50 25" delay=0 duration=4000 time={timer.time}
  />
  <Line 
    x0={0} x2={600} y0={40} y2={10} stroke="DodgerBlue" 
    strokeWidth={10} strokeDashArray="0 25 50 0 25 50 25" delay=3000 duration=500 time={timer.time}
  />
</svg>

The main thing is to compute what fraction of the way through the animation we are based on the timing, delay, and duration.

```js
let fraction = $derived((time - delay) / duration);
```

We don't want the fraction to be less than 0 or greater than 1, so we clamp the value to that interval. It would be nice if `clamp` were [part of Math](https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment#comment137766458_39477954), but since it's not, we'll borrow a suggested implementation:

```js
function clamp(num, min, max) {
	return num <= min ? min : num >= max ? max : num;
}
```

and then we just construct an svg element that uses the fraction to interpolate where it should be

```svelte
<script>
	const { x1, y1, xto, yto, delay, duration, time, stroke, strokeWidth, strokeDasharray } =
		$props();

	let fraction = $derived(clamp((time - delay) / duration, 0, 1));
	let x2 = $derived(x1 + (xto - x1) * fraction);
	let y2 = $derived(y1 + (yto - y1) * fraction);
</script>

<line
	{x1}
	{y1}
	{x2}
	{y2}
	{stroke}
	stroke-dasharray={strokeDasharray}
	stroke-linecap="square"
	stroke-width={strokeWidth}
>
</line>
```

The colorful lines above are just

```svelte
<svg viewbox="0 0 600 100" class="w-full mx-auto">
	<Line
		x1={0}
		xto={600}
		y1={40}
		yto={10}
		stroke="DodgerBlue"
		strokeWidth={10}
		strokeDashArray="0 25 50 0 25 50 25"
		delay="3000"
		duration="500"
		time={timer.time}
	/>
	<Line
		x1={0}
		xto={600}
		y1={50}
		yto={50}
		stroke="Tomato"
		strokeWidth={20}
		strokeDashArray="0 25 0 25 0 25"
		delay="0"
		duration="3000"
		time={timer.time}
	/>
	<Line
		x1={0}
		xto={600}
		y1={20}
		yto={30}
		stroke="MediumSeaGreen"
		strokeWidth={20}
		strokeDashArray="0 0 50 0 25 50 25"
		delay="0"
		duration="4000"
		time={timer.time}
	/>
</svg>
```

The circles are the same deal, mostly. We use trigonometry to get some points on a circle, and then figure out what points are visible based on the timing and draw a `path` element.

I'm not sure what's next. It seems like it would be pretty easy to add [easing](https://svelte.dev/docs/svelte-easing), but I'd also like to explore [procedural animation](https://www.youtube.com/watch?v=qlfh_rv6khY), or maybe incorporating [physics](https://brm.io/matter-js/). Stay tuned.

<div class="flex place-content-center">🔲</div>
