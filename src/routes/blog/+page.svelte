<script>
	const { data } = $props();

	const dateOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'utc'
	};
</script>

<svelte:head>
	<title>Blog</title>
	<meta data-key="description" name="description" content="twirl blog posts" />
</svelte:head>

<div class="m-6 flex flex-col gap-4">
	<h1 class="text-4xl mb-2">Posts</h1>
	{#each data.posts as post, i}
		<a class="" href="/blog/{post.slug}">
			<div>{post.title}</div>
			<div class="text-sm text-gray-500">
				{new Date(post.date).toLocaleDateString('en-US', dateOptions)}
			</div>
		</a>

		<p>{post.excerpt}</p>
	{/each}
</div>
