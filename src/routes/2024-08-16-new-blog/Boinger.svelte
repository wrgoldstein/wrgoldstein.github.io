<script>
  let boing = $state(0)
  let dir = $state("right")

  import { onMount } from "svelte"

  function changeDirection(){
    dir = dir === "right" ? "left" : "right"
  }

  onMount(() => {
    setInterval(() => {
      if (boing > 100 || boing < 0) changeDirection()
      boing += dir === "right" ? 1 : -1
    }, 10)
  })
</script>

<style>
  .boing {
    margin-left: var(--boing);
  }
</style>

<div class="boing" style="--boing: {boing}px;">Boing</div>

... and that's all I had time for today. To be continued!
