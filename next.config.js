/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'ghhpyyqfblzhmyzjlrhs.supabase.co', // development supabase image bucket
			ykojjcrjusqoavfzxxnj.supabase.co, // production supabase image bucket
			'lh3.googleusercontent.com',
		],
	},
};

module.exports = nextConfig;
