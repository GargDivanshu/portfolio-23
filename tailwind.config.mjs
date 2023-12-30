/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#E91E63',
				bgPrimary: "#13151A",
				blackPrimary: '#1A1A1A',
				textPink: '#E67FB4',
				textBlue: '#78A9D9',
				textOrange: '#F2AB79',
			}
		},
	},
	plugins: [],
}
