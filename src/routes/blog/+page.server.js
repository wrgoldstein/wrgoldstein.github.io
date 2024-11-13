export const load = async ({ url, fetch }) => {
	// const postRes = await fetch(`${url.origin}/api/posts.json`)
	// const posts = await postRes.json()

	// const totalRes = await fetch(`${url.origin}/api/posts/count`)
	// const total = await totalRes.json()

	const posts = await Promise.all(
		Object.entries(import.meta.glob('/src/lib/posts/*.md')).map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const slug = path.split('/').pop().slice(0, -3);
			return { ...metadata, slug };
		})
	);

	let sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

	sortedPosts = sortedPosts.map((post) => ({
		authors: post.authors,
		title: post.title,
		slug: post.slug,
		summary: post.summary,
		coverImage: post.imageUrl,
		coverWidth: post.coverWidth,
		coverHeight: post.coverHeight,
		date: post.date,
		categories: post.categories
	}));

	return { posts: sortedPosts, total: posts.length };
};
