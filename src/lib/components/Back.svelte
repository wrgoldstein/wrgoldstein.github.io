<script>
  import { onMount } from 'svelte';

  let current_url = $state()

  onMount(() => {
    current_url = window.location.pathname
  });
</script>

{#if current_url?.startsWith("/blog")}
  <a href="/blog">back</a>
{/if}
