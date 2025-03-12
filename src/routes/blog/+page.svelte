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

<div class="container mx-auto px-4 py-8">
	<header class="mb-8">
		<nav class="mb-6">
			<a href="/" class="text-gray-500 hover:text-gray-700">← Back to Home</a>
		</nav>
		<h1 class="text-4xl font-bold">Posts</h1>
	</header>
	
	<div class="grid gap-8">
		{#each data.posts as post, i}
			<article class="border-b pb-6">
				<a href="/blog/{post.slug}" class="group">
					<h2 class="text-2xl font-semibold">{post.title}</h2>
					<div class="text-sm text-gray-500 mb-2">
						{new Date(post.date).toLocaleDateString('en-US', dateOptions)}
					</div>
				</a>
				<p class="text-gray-700">{post.excerpt}</p>
				<a href="/blog/{post.slug}" class="inline-block mt-2">Read more →</a>
			</article>
		{/each}
	</div>
</div>