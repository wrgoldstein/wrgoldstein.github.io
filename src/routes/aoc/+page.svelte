<script>
	const zip = (arr, ...arrs) => {
		return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
	};

	const input = `
  3   4
  4   3
  2   5
  1   3
  3   9
  3   3
`.trim();

	const lists = input.split('\n').map((line) =>
		line
			.trim()
			.split(/\s+/)
			.map((n) => +n)
	);
	
</script>

<div>
  <svg viewBox="0 0 100 100">
    <!-- <rect x=0 y=0 width=100 height=100 fill="red"></rect> -->
    {#each lists as n}
      <text x={n[0]*10} y=50 fill="black" font-size="larger">{n[0]}</text>
    {/each}
  </svg>
</div>