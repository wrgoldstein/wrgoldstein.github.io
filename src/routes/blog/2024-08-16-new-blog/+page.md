<script context="module">
    export const title = "New blog"
    export const date = new Date(2024, 8, 16)

    import Boinger from "./Boinger.svelte"
    import Back from "$lib/components/Back.svelte"
</script>

<Back/>

# {title}

I've got a new blog! Well, the same blog, but with some upgrades I'd been thinking about for the last couple of years that I hadn't gotten around to yet.

The old blog was a classic [Github Pages Jekyll blog](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll), which was totally fine for what it was, but it was missing some things I really wanted.

The main missing thing is that the old blog was built on classic markdown, which meant it supported javascript inside `<script>` tags, and markdown text, but the two couldn't interact. The new idea is to back the blog up with a more modern component engine ([svelte](https://svelte.dev/)), which will let me do interactive things more easily.

Here's an example. Change the amplitude or the frequency of this sinoidal function and it will update in real time:

<Boinger/>

Not impossible to do in vanilla javascript of course, but the entire code for this is just:

<br>

```svelte
<script>
  let A = $state(50) // amplitude
  let f = $state(1) // ordinary frequency

  const x = [...Array(1000).keys()].map(i => i / 50)

  let Y = $derived(
    x.map(t0 => A*Math.sin(2*Math.PI*f*t0 + p))
  )

  let d = $derived.by(() => {
    return "M" + x.map((x0, i) => `${x0 * 100} ${Y[i] + 0.5*A}`).join("L")
  })
</script>

<div class="flex gap-3 m-2">
  <div>
    Amplitude
    <input type="range" bind:value={A}></div>
  <div>
    Frequency
    <input type="range" bind:value={f} min="1" max="10" step="0.2"></div>
</div>

<svg viewBox="0 -100 1000 400" class="mx-auto mt-6 w-3/4">
  <path 
    d={d} 
    fill="none" 
    stroke="maroon" 
    stroke-width="4" 
    stroke-linecap="round">
  </path>
</svg>
```

Which is cleaner and faster than doing it with event handlers etc.

