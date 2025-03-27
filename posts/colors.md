---
title: Colors
summary: Where I wish I were a designer
date: 2025-03-27
---

<script>
    import { Spring, Tween } from "svelte/motion"
  // Number of segments
  const segments = 64;
  
  // Donut configuration
  const centerX = 100;
  const centerY = 100;
  const outerRadius = 50;
  const innerRadius = 25; // This creates the donut hole
  
  // Function to calculate points on circle
  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
  
  // Generate path for each donut segment
  function createDonutSegmentPath(i) {
    const startAngle = i * (360 / segments);
    const endAngle = (i + 1) * (360 / segments);
    
    const outerStart = polarToCartesian(centerX, centerY, outerRadius, startAngle);
    const outerEnd = polarToCartesian(centerX, centerY, outerRadius, endAngle);
    const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
    const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    
    // Create the donut segment path
    return `
      M ${outerStart.x} ${outerStart.y}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}
      L ${innerStart.x} ${innerStart.y}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerEnd.x} ${innerEnd.y}
      Z
    `;
  }
  
  // Generate HSL color for each segment
  function getSegmentColor(i) {
    const hue = i * (360 / segments);
    return `hsl(${hue}, 100%, 50%)`;
  }

  function calculateMarkerPosition(angle) {
    const angleInRadians = angle * (Math.PI / 180); // Convert to radians
    const markerRadius = (outerRadius + innerRadius) / 2; // Position in middle of donut
    const markerX = centerX + Math.cos(angleInRadians - Math.PI/2) * markerRadius;
    const markerY = centerY + Math.sin(angleInRadians - Math.PI/2) * markerRadius;
    return { x: markerX, y: markerY };
  }

  function setColor(i){
    return () => {
        primaryColor.target = i * (360 / segments)
        inputColor = i * (360 / segments)
    }
  }

  let inputColor = $state(238)
  let primaryColor = $state(new Spring(238))
  const colorCombos = $derived.by(() => {
    return {
        brighter: 80,
    }})
</script>

Here's a color combination I like:

<div class="flex mt-8">
    <div style="background-color: hsl({primaryColor.current}, 100%, 50%)" class="w-72 h-6"></div>
    <div style="background-color: hsl({primaryColor.current - 190}, 100%, 50%)" class="w-72 h-6"></div>
    <div style="background-color: hsl({primaryColor.current - 190 - 30}, 100%, 50%)" class="w-72 h-6"></div>
</div>

What do I like about it? Well, its the primary colors, but just a bit off in a satisfying way. The colors are ketchuppy and tactile.

A natural question is what's a fourth color that would look good with these? First, take a look at where they are on a color wheel.

<div class="flex justify-center h-96">
    <svg viewBox="0 40 200 120">
        {#each Array(segments) as _, i}
            <path
            class="cursor-pointer"
            d={createDonutSegmentPath(i)} 
            fill={getSegmentColor(i)}
            onclick={setColor(i)}
            stroke="white" 
            stroke-width="0.1"
            />
        {/each}
        <!-- Simple marker at 48 degrees -->
        {#each [primaryColor.current, primaryColor.current - 190,  primaryColor.current - 190 - 30] as angle}
            {@const mark = calculateMarkerPosition(angle)}
            <text 
                x={mark.x - 5} 
                y={mark.y + 5} 
                r="4" 
                fill="black" 
                stroke="white"
                stroke-width=".5" 
            >▢{Math.round(angle + 360) % 360}°</text>
        {/each}
    </svg>
</div>


Two are opposite each other; these are called complementary colors. Another is just a few degrees away from one of the compliments. This is called a split complimentary scheme.

A good choice to expand our palette in a split complementary color scheme is to riff on the saturation and brightness of the main three:

<div class="flex gap-6 flex-col md:flex-row">
Adjust the main color:
<input class="w-72" bind:value={inputColor} type="range" min="0" max="360" onchange={() => primaryColor.target = inputColor}>
</div>

<div class="flex mt-8">
    <div style="background-color: hsl({primaryColor.current}, 100%, 50%);" class="w-72 h-12"></div>
    <div style="background-color: hsl({primaryColor.current}, 100%, 80%);" class="w-72 h-12"></div>
    <div style="background-color: hsl({primaryColor.current}, 50%, 50%);" class="w-72 h-12"></div>
    <div style="background-color: hsl({primaryColor.current}, 100%, 20%);" class="w-72 h-12"></div>
    <div style="background-color: hsl({primaryColor.current - 190}, 100%, 50%);" class="w-72 h-12"></div>
    <div style="background-color: hsl({primaryColor.current - 190}, 100%, 80%);" class="w-72 h-12"></div>
    <div style="background-color: hsl({primaryColor.current - 190}, 50%, 50%);" class="w-72 h-12"></div>
    <div style="background-color: hsl({primaryColor.current - 190}, 100%, 20%);" class="w-72 h-12"></div>
    <div style="background-color: hsl({primaryColor.current - 220}, 100%, 50%);" class="w-72 h-12"></div>
    <div style="background-color: hsl({primaryColor.current - 220}, 100%, 80%);" class="w-72 h-12"></div>
    <div style="background-color: hsl({primaryColor.current - 220}, 50%, 50%);" class="w-72 h-12"></div>
    <div style="background-color: hsl({primaryColor.current - 220}, 100%, 20%);" class="w-72 h-12"></div>
</div>

---

We can also add in a fourth color by adding 90 degrees to the primary color. This is called a triadic color. Ish.

<div class="flex mt-8">
    <div style="background-color: hsl({primaryColor.current}, 100%, 50%)" class="w-72 h-6"></div>
    <div style="background-color: hsl({primaryColor.current + 90}, 100%, 50%)" class="w-72 h-6"></div>
    <div style="background-color: hsl({primaryColor.current - 190}, 100%, 50%)" class="w-72 h-6"></div>
    <div style="background-color: hsl({primaryColor.current - 190 - 30}, 100%, 50%)" class="w-72 h-6"></div>
</div>





Of course we can go the other direction with -90 degrees for a fifth color:

<div class="flex mt-8">
    <div style="background-color: hsl({primaryColor.current + 90}, 100%, 50%)" class="w-72 h-6"></div>
    <div style="background-color: hsl({primaryColor.current}, 100%, 50%)" class="w-72 h-6"></div>
    <div style="background-color: hsl({primaryColor.current - 90}, 100%, 50%)" class="w-72 h-6"></div>
    <div style="background-color: hsl({primaryColor.current - 190}, 100%, 50%)" class="w-72 h-6"></div>
    <div style="background-color: hsl({primaryColor.current - 190 - 30}, 100%, 50%)" class="w-72 h-6"></div>
</div>

<div class="flex gap-6 flex-col md:flex-row mt-6">
    Here's that color slider again:
    <input class="w-72" bind:value={inputColor} type="range" min="0" max="360" onchange={() => primaryColor.target = inputColor}>
</div>

<div class="flex justify-center h-96 mt-4">
    <svg viewBox="0 40 200 120">
        {#each Array(segments) as _, i}
            <path
            data-i={i}
            class="cursor-pointer"
            d={createDonutSegmentPath(i)} 
            fill={getSegmentColor(i)} 
            onclick={setColor(i)}
            stroke="white" 
            stroke-width="0.1"
            />
        {/each}
        <!-- Simple marker at 48 degrees -->
        {#each [primaryColor.current + 90, primaryColor.current - 90, primaryColor.current, primaryColor.current - 190,  primaryColor.current - 190 - 30] as angle}
            {@const mark = calculateMarkerPosition(angle)}
            <text 
                x={mark.x - 5} 
                y={mark.y + 5} 
                r="4" 
                fill="black" 
                stroke="white"
                stroke-width=".5" 
            >▢{Math.round(angle + 360) % 360}°</text>
        {/each}
    </svg>
</div>

This starts to look garish, but it can be necessary when plotting a chart and maximum contrast is desired between different categories. See the [D3.js categorical schemes](https://d3js.org/d3-scale-chromatic/categorical) for examples.

Perceptually red, blue and green tend to take up a little bit more than their fair share of space. The result is you can usually distinguish between two oranges better than you can between two reds of the same brightness. This is why the same relative arrangement of colors around the color wheel don't look perceptually even, and some of the above generated palettes look better than others.
