import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{html,js,svelte,ts,md}', './posts/**/*.{html,js,svelte,ts,md}'],
	theme: {
		extend: {}
	},
	plugins: [typography()]
};
