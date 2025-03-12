import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	try {
		const postModules = import.meta.glob('/posts/*.md');
		const postPath = `/posts/${params.post}.md`;

		if (!postModules[postPath]) {
			throw new Error(`Post ${params.post} not found`);
		}

		const post = await postModules[postPath]();

		return {
			PostContent: post.default,
			meta: { ...post.metadata, slug: params.post }
		};
	} catch (err) {
		error(404, err);
	}
};
