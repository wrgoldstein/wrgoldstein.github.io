---
layout: post
title:  tiny dagre-d3 example
date:   2021-02-11
---

It took me a little bit of digging to make a minimal example of how to use dagre-d3 (dagre.js + d3 renderer), so I wanted to record it here for future reference.

At the time of writing, I like [snowpack](https://www.snowpack.dev/) and [svelte](https://svelte.dev/) for my web development needs, so if you need a scaffold for this check those projects out. This link might be out of date a few months from now, but there's a tutorial [here](https://www.snowpack.dev/tutorials/svelte).

Assuming you've got a working web app setup: install `dagre-d3`:

```
npm install dagre-d3 --save
```

And here's the (svelte) js part:

```js
  import { onMount } from "svelte"
  import dagreD3 from "dagre-d3"
  import * as d3 from "d3"

  var g = new dagreD3.graphlib.Graph().setGraph({});
  g.setNode("A", {})
  g.setNode("B", {})
  g.setEdge("A", "B", {})

  let render = new dagreD3.render()

  onMount( () => {
    let svg = d3.select("svg")
    let inner = svg.append("g")
    render(inner, g);
  })
```

The css:

```css
.node rect {
  stroke: #333;
  fill: #fff;
}

.edgePath path {
  stroke: #333;
  fill: #333;
  stroke-width: 1.5px;
}

.node text {
  pointer-events: none;
}
```

and finally some html:

```html
<div class="App">
  <div>
    `dagre-d3` example
  </div>

  <svg width=960 height=600></svg>
</div>
```

Notes:

1. Because the svg nodes are generated outside of the svelte framework, the css will have to be global not embedded in the svelte component.
