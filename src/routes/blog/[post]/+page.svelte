<!-- This file renders each individual blog post for reading. Be sure to update the svelte:head below -->
<script>
	const { data } = $props();

	const dateOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'utc'
	};

	const {
		title,
		category,
		excerpt,
		date,
		updated,
		coverImage,
		coverWidth,
		coverHeight,
		categories
	} = data.meta;
	const { PostContent } = data;
</script>

<svelte:head>
	<!-- Be sure to add your image files and un-comment the lines below -->
	<title>{title}</title>
	<meta data-key="description" name="description" content={excerpt} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
	<meta property="og:description" content={excerpt} />
	<meta name="twitter:description" content={excerpt} />
	<!-- <meta property="og:image" content="https://yourdomain.com/image_path" /> -->
	<meta property="og:image:width" content={coverWidth} />
	<meta property="og:image:height" content={coverHeight} />
	<!-- <meta name="twitter:image" content="https://yourdomain.com/image_path" /> -->
</svelte:head>


<article
	class="tracking-wide prose mx-auto mt-16 prose-a:text-twirl prose-pre:border prose-pre:border-neutral-700 prose-img:rounded-xl prose-figcaption:lg:-ml-[5ch] prose-figcaption:lg:max-w-[75ch] prose-img:lg:-ml-[5ch] prose-img:lg:max-w-[90ch] px-8 lg:max-w-[85ch] mb-16"
>
<a href="/">back</a>
	<!-- You might want to add an alt frontmatter attribute. If not, leaving alt blank here works, too. -->
	<img
		class="cover-image"
		src={coverImage}
		alt=""
		style="aspect-ratio: {coverWidth} / {coverHeight};"
		width={coverWidth}
		height={coverHeight}
	/>
	<div class="flex gap-2 text-sm">
		{new Date(date).toLocaleDateString('en-US', dateOptions)}
	</div>
	<h1 class="text-5xl font-[400] text-purple mt-6 mb-12">{title}</h1>
	<PostContent />
</article>

<style>
	article {
		/* width: clamp(400px, 70vw, 1000px); */
		margin-left: auto;
		margin-right: auto;
		margin-top: 10rem;
	}
</style>
