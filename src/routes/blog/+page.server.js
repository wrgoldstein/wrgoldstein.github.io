export const load = async ({ url, fetch }) => {
	const posts = await Promise.all(
		Object.entries(import.meta.glob('/posts/*.md')).map(async ([path, resolver]) => {
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
