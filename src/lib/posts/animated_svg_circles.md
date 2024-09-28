---
layout: post
title: Animated SVG Circles with Svelte
date: 2024-09-27
---

<script>
  import { onMount } from "svelte";
  import Circle from "./svg/Circle.svelte";
  import Line from "./svg/Line.svelte";

  const loop_time = 5_500;

  let zero = $state();
  let time = $state();

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

<svg viewbox="0 0 600 100" class="w-full mt-24 mx-auto">
  <path d="M0 50 L 250 50" stroke="#2c5943" stroke-dasharray="0 1 0"></path>
  <path d="M300 50 L 600 50" stroke="#2c5943" stroke-dasharray="0 1 0"></path>

  <Line
    x0={0}
    x2={100}
    y0={50}
    y2={50}
    stroke="#2c5943"
    strokeWidth={4}
    {time}
    delay="0"
    duration={250}
  />

  <rect x="100" y="0" width="100" height="100" rx="15" fill="#2c5943"></rect>
  <Circle
    cx={150}
    cy={50}
    r={25}
    {time}
    delay="250"
    duration="500"
    hold="500"
    draw="reversed"
  />
  <Circle
    cx={150}
    cy={50}
    r={35}
    {time}
    delay="750"
    duration="500"
    strokeDasharray="4 4"
  />
  <Circle
    cx={150}
    cy={50}
    r={45}
    {time}
    delay="1250"
    duration="500"
    strokeDasharray="0 4"
  />
  <Circle
    cx={150}
    cy={50}
    r={25}
    {time}
    delay="1750"
    duration="500"
    hold="400"
  />

  <Line
    x0={200}
    x2={250}
    y0={50}
    y2={50}
    stroke="#2c5943"
    strokeWidth={4}
    {time}
    delay=2250
    duration={250}
  />

  <rect x="250" y="0" width="100" height="100" rx="15" fill="#2c5943"></rect>
  <path d="M300 0 L 300 100" stroke="white" stroke-dasharray="0 1 0"></path>
  <path d="M250 50 L 350 50" stroke="white" stroke-dasharray="0 1 0"></path>
  <Circle
    cx={300}
    cy={50}
    r={25}
    {time}
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
    {time}
    delay="0"
    duration="4000"
    hold="500"
    draw="none"
  />
  <Circle cx={300} cy={50} r={35} {time} delay="3000" duration="500" />
  <Circle
    cx={300}
    cy={50}
    r={45}
    {time}
    delay="3500"
    duration="500"
    strokeDasharray="0 4"
  />

  <Line
    x0={350}
    x2={450}
    y0={50}
    y2={50}
    stroke="#2c5943"
    strokeWidth={4}
    {time}
    delay=4000
    duration={250}
  />

  <rect x="400" y="0" width="100" height="100" rx="15" fill="#2c5943"></rect>
  <Circle
    cx={450}
    cy={50}
    r={25}
    {time}
    delay="0"
    duration="4000"
    hold="500"
    draw="none"
  />
  <Circle
    cx={450}
    cy={50}
    r={28}
    {time}
    delay="4250"
    duration="500"
    hold="500"
    strokeWidth={10}
  />
  <Circle
    cx={450}
    cy={50}
    r={45}
    {time}
    delay="4750"
    duration="500"
    strokeDasharray="0 4"
  />

  <Line
    x0={500}
    x2={600}
    y0={50}
    y2={50}
    stroke="#2c5943"
    strokeWidth={4}
    {time}
    delay=5250
    duration={250}
  />
</svg>

In what may be a minor form of [hyperfixation](https://www.charliehealth.com/post/what-is-hyperfixation), I've been totally hooked on the idea of animating svg shapes with [Svelte](https://svelte.dev/).

I wrote [a website recently for work](https://twirldata.com), and as part of that process I got connected to fantastic designer (who I'll mention by name if I get permission) who supplied me with everything I needed.

One aspect of her vision was to include lots of fun iconographics and animations, and it turns out she's skilled at making little 2D animations in [AfterEffects](https://www.adobe.com/products/aftereffects.html).

When I saw these my thought was-- I could do that in code (instead of a gif, like it is on the website), and it would be soooo slick.

<svg viewbox="200 0 600 100" class="w-full my-12 mx-auto">
<rect x="400" y="0" width="100" height="100" rx="15" fill="#2c5943"></rect>
  <Circle
    cx={450}
    cy={50}
    r={25}
    {time}
    delay="1000"
    duration="500"
    hold="500"
  />
  <Circle
    cx={450}
    cy={50}
    r={28}
    {time}
    delay="1250"
    duration="500"
    hold="500"
  />
  <Circle
    cx={450}
    cy={50}
    r={20}
    draw="reversed"
    {time}
    delay="1750"
    duration="500"
    strokeDasharray="0 4"
  />
  <Circle
    cx={450}
    cy={50}
    r={40}
    {time}
    delay="1850"
    duration="800"
    strokeDasharray="0 4"
  />
</svg>

Of course, it's already slick. There's no need at all to do more, it's great the way it is. But still... how does [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) work anyway?

And of course you could do all this in vanilla javascript, but Svelte saves you having to manually modify the DOM, and it turns out the timing / animation apparatus is really easy!

Here's everything you need for the animation timing (cribbed from [here](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#examples)):

```svelte
<script>
  const loop_time = 5_500;

  let zero = $state();
  let time = $state();

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

Note if you try to do this with recursive `setTimeout`s like I did at first, you'll be up a creek. setTimeout is super unreliable for syncing multiple animations, which is why the animation API exists in browsers.

What I like about the example I'm recreating here is it's tight timing and sense of rhythm. To achieve that, we just have a Svelte component that receives the `time` prop from the parent above, and then computes an SVG `<path/>` that corresponds to the desired effect and timing.

<div class="p-4 bg-gray-200">

Note the [svelte/transition](https://svelte.dev/docs/svelte-transition) package has `draw` in it, which achieves much of the same effect by [stroke-dash animation](https://css-tricks.com/svg-line-animation-works/)--- but I wanted my lines to retain their stroke dashes, and also to build towards working with more complicated shapes that can't be animated with this trick.

</div>

Once you have the timing, Svelte makes the rest really easy.

<svg viewbox="0 0 600 100" class="w-full mx-auto">
  <Line 
    x0={0} x2={600} y0={50} y2={50} stroke="Tomato" 
    strokeWidth={20} strokeDashArray="0 25 0 25 0 25" delay=0 duration=3000 {time}
  />
  <Line 
    x0={0} x2={600} y0={20} y2={30} stroke="MediumSeaGreen" 
    strokeWidth={20} strokeDashArray="0 0 50 0 25 50 25" delay=0 duration=4000 {time}
  />
  <Line 
    x0={0} x2={600} y0={40} y2={10} stroke="DodgerBlue" 
    strokeWidth={10} strokeDashArray="0 25 50 0 25 50 25" delay=3000 duration=500 {time}
  />
</svg>

Check it out:

```svelte
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
    strokeWidth,
    strokeDasharray
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
</script>

<path
  d="M {x0} {y0} L {x1} {y1}"
  {stroke}
  stroke-dasharray={strokeDasharray}
  stroke-linecap="square"
  stroke-width={strokeWidth}
>
</path>
```



Sidenote wouldn't it be nice if `clamp` were [part of Math](https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment#comment137766458_39477954)?

The colorful lines above are just

```svelte
<svg viewbox="0 0 600 100" class="w-full mx-auto">
  <Line 
    x0={0} x2={600} y0={40} y2={10} stroke="DodgerBlue" 
    strokeWidth={10} strokeDashArray="0 25 50 0 25 50 25" delay=3000 duration=500 {time}
  />
  <Line 
    x0={0} x2={600} y0={50} y2={50} stroke="Tomato" 
    strokeWidth={20} strokeDashArray="0 25 0 25 0 25" delay=0 duration=3000 {time}
  />
  <Line 
    x0={0} x2={600} y0={20} y2={30} stroke="MediumSeaGreen" 
    strokeWidth={20} strokeDashArray="0 0 50 0 25 50 25" delay=0 duration=4000 {time}
  />
</svg>
```

I'm not sure what's next. It seems like it would be pretty easy to add [easing](https://svelte.dev/docs/svelte-easing), but I'd also like to explore [procedural animation](https://www.youtube.com/watch?v=qlfh_rv6khY), or maybe incorporating [physics](https://brm.io/matter-js/) to make some sort of [Rube Goldberg machine](https://en.wikipedia.org/wiki/Rube_Goldberg_machine).

<svg class="w-1/2" version="1.0" xmlns="http://www.w3.org/2000/svg"
 height="10rem" viewBox="-100 -100 953.000000 1480.000000"
 >
<metadata>
Created by potrace 1.15, written by Peter Selinger 2001-2017
</metadata>
<g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<Circle
    cx={4050}
    cy={6485}
    r={6905}
    stroke="tomato"
    strokeWidth={200}
    {time}
    delay="0"
    duration="500"
    hold="400"
  />
  <Circle
    cx={4150}
    cy={6485}
    r={6805}
    stroke="pink"
    strokeWidth={200}
    {time}
    delay="1000"
    duration="500"
    hold="400"
  />
<path d="M6235 12785 c-287 -54 -537 -211 -717 -449 -191 -252 -344 -772 -523
-1770 -71 -400 -124 -739 -266 -1706 -113 -771 -150 -1003 -159 -993 -10 11
-301 610 -660 1358 -1005 2093 -1354 2752 -1642 3102 -115 138 -237 208 -477
270 -98 26 -121 28 -296 28 -144 0 -210 -4 -272 -18 -399 -86 -711 -313 -868
-632 -62 -125 -92 -229 -105 -362 -55 -576 444 -1663 1471 -3203 445 -668
1039 -1474 1342 -1823 81 -92 91 -110 42 -71 -59 46 -288 194 -380 245 -780
431 -1416 374 -1774 -161 -148 -222 -221 -442 -221 -670 0 -246 79 -464 251
-693 l76 -102 -101 -36 c-476 -168 -768 -523 -896 -1089 -90 -404 -69 -795 71
-1259 244 -815 841 -1537 1719 -2080 253 -157 890 -412 1314 -527 171 -46 436
-99 611 -121 196 -24 625 -24 820 1 554 70 1098 250 1735 571 500 253 858 503
1175 820 612 611 948 1371 1015 2300 30 424 -20 1224 -111 1768 -141 841 -397
1449 -773 1836 -181 185 -299 247 -666 346 -96 26 -179 51 -184 56 -10 9 -16
-21 141 704 256 1184 470 2060 599 2460 137 424 165 702 97 994 -47 208 -136
372 -287 529 -110 115 -216 192 -360 263 -175 86 -313 119 -511 125 -106 2
-174 -1 -230 -11z m378 -269 c321 -62 614 -300 717 -583 48 -134 63 -244 57
-413 -7 -178 -26 -271 -112 -545 -166 -532 -363 -1348 -671 -2779 -51 -242
-95 -441 -97 -443 -14 -13 -1693 -160 -1704 -149 -1 1 8 60 22 132 32 175 89
547 180 1169 232 1590 360 2284 520 2810 84 276 151 407 276 539 127 134 281
225 442 260 83 19 278 19 370 2z m-5008 -157 c114 -14 236 -49 325 -94 84 -42
150 -116 273 -302 177 -267 361 -604 701 -1283 236 -469 384 -773 876 -1800
128 -267 324 -671 435 -898 189 -383 202 -412 182 -416 -12 -3 -69 -14 -127
-25 -165 -32 -276 -67 -395 -126 -259 -128 -427 -326 -525 -619 l-32 -98 -22
25 c-365 432 -899 1155 -1335 1807 -836 1249 -1331 2219 -1432 2808 -30 177
-23 288 25 432 114 336 497 585 921 599 22 0 81 -4 130 -10z m5253 -4937 c274
-76 362 -110 457 -173 150 -101 336 -341 470 -608 264 -527 409 -1218 465
-2205 13 -230 13 -619 0 -766 -103 -1149 -651 -2018 -1658 -2627 -185 -112
-651 -345 -872 -436 -440 -182 -841 -288 -1239 -327 -132 -13 -459 -13 -592 0
-489 48 -1015 204 -1663 494 -319 143 -704 424 -1032 751 -254 254 -428 480
-577 751 -247 451 -379 999 -338 1409 42 414 168 723 378 926 96 93 181 151
298 203 119 54 158 54 290 1 124 -49 469 -218 590 -289 111 -66 370 -207 570
-311 83 -43 274 -146 425 -228 151 -83 370 -199 487 -259 205 -105 215 -112
286 -187 130 -139 307 -421 307 -490 0 -51 -32 -172 -64 -245 -52 -118 -80
-140 -270 -211 -165 -61 -314 -87 -496 -87 -85 0 -186 5 -225 11 -580 97
-1137 484 -1688 1172 -46 57 -90 102 -107 109 -99 41 -207 -53 -179 -155 18
-66 287 -383 505 -595 439 -427 887 -686 1354 -781 100 -21 144 -24 330 -24
188 0 229 3 330 24 232 48 480 150 562 232 52 52 51 52 63 -36 9 -74 75 -365
90 -402 30 -72 144 -98 204 -47 54 45 58 83 22 230 -125 522 -119 974 19 1395
101 306 295 611 531 833 157 148 450 373 679 521 223 145 569 330 795 425 162
68 162 68 186 116 25 54 20 99 -17 143 -48 58 -70 58 -296 2 -665 -166 -1186
-182 -1649 -52 -240 68 -428 163 -656 332 -165 123 -284 260 -362 421 l-31 63
20 99 c74 378 249 587 577 690 176 55 285 70 745 106 644 50 792 62 1098 90
179 17 377 37 440 44 63 8 138 13 165 12 28 -1 150 -30 273 -64z m-4817 -671
c295 -68 623 -236 974 -500 723 -543 1206 -1225 1251 -1768 17 -201 -67 -387
-206 -458 -258 -132 -782 22 -1598 468 -125 69 -308 168 -407 222 -494 266
-828 563 -975 869 -64 133 -83 214 -83 346 -1 125 25 233 83 357 127 271 298
424 535 479 84 19 313 11 426 -15z m2140 -1252 c154 -75 365 -143 559 -178
177 -32 324 -43 558 -39 122 2 222 2 222 1 0 -1 -64 -44 -142 -96 -291 -193
-557 -404 -735 -585 l-113 -115 0 38 c0 51 -35 218 -66 317 -58 183 -162 394
-290 591 -35 53 -62 97 -61 97 2 0 32 -14 68 -31z m-74 -1766 c-10 -36 -68
-249 -75 -278 l-8 -30 -51 76 c-28 41 -74 104 -103 140 l-51 64 103 12 c57 7
117 16 133 22 46 14 58 13 52 -6z"/>
</g>
</svg>