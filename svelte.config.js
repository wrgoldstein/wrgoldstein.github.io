import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex'
import { createHighlighter } from 'shiki';

const theme = 'nord';
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ['javascript', 'svelte', 'python', 'sql', 'elixir', 'ruby']
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
	paths: {
		base: process.env.MODE === "production" ?  "/wrgoldstein.github.io" : ""
	}
  },
  extensions: [".svelte", ".md"],
  preprocess: [
	mdsvex({
		extensions: ['.md'],
		highlight: {
			highlighter: async (code, lang = 'text') => {
				const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
				return `{@html \`${html}\` }`;
			}
		},
	}),
	vitePreprocess()
  ]
};

export default config;
