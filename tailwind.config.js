/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
	],
	plugins: [require('flowbite/plugin')],
};
