import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex'

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
	}),
	vitePreprocess()
  ]
};

export default config;
