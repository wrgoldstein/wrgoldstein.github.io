<script>
  let boing = $state(0)

  import { onMount } from "svelte"

  onMount(() => {
    setInterval(() => {
      if (boing > 100){
        boing = 0
      }
      boing++
    }, 10)
  })
</script>

<style>
  .boing {
    margin-top: var(--boing);
  }
</style>
<div class="boing" style="--boing: {boing}px;">Hello</div>
