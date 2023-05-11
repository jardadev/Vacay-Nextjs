/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.jsx'],
	theme: {
		extend: {
			fontFamily: {
				nunito: ['var(--font-nunito)'],
			},
		},
	},
	plugins: [require('daisyui'), require('@tailwindcss/aspect-ratio')],
	darkMode: ['class', '[data-theme="dark"]'],
	daisyui: {
		darkTheme: 'night',
		themes: ['light', 'night'],
	},
};
