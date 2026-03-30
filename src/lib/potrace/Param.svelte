<script>
  const { label, value, min, max, step, hint, set } = $props();
</script>

<div class="space-y-0.5">
  <div class="flex justify-between items-baseline">
    <span class="text-xs text-gray-600" title={hint}>{label}</span>
    <span class="text-xs tabular-nums text-gray-500">{value}</span>
  </div>
  <input type="range" {min} {max} {step} {value}
         oninput={e => set(+e.target.value)}
         class="w-full accent-black h-1" />
  <p class="text-xs text-gray-400 leading-snug">{hint}</p>
</div>
