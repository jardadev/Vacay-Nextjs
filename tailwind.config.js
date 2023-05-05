/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.jsx'],
	theme: {
		extend: {
			fontFamily: {
				raleway: ['var(--font-raleway)'],
			},
		},
	},
	plugins: [require('daisyui')],
};
