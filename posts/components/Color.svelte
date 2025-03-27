<script>
  export const { color, children } = $props();
</script>

<span class="{color}">{@render children()}</span>
