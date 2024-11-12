<script>
  import opentype from "opentype.js";

  let path
  let path2
  let d = $state()
  let i = 0;

  $effect.root(async () => {
    const buffer = fetch("/sourgummy.ttf").then((res) => res.arrayBuffer());
    const font = opentype.parse(await buffer);
    path = font.getPath("hello world", 200, 100, 64, {});
    path2 = font.getPath("", 200, 100, 64, {});
    
    let interval = setInterval(() => {
      i++
      path2.commands = path.commands.slice(0, i)
      d = path2.toPathData()
      if (i > 2000) clearInterval(interval)
    }, 10)
  });
</script>

<div>
  <!-- <h1 class="text-7xl mt-64 text-center">hello world</h1> -->
  <svg class="w-full" viewBox="0 0 800 200">
    <path fill="none" stroke="black" {d}></path>
  </svg>
</div>
