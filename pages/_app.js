import '@/styles/globals.css';
import { Raleway } from 'next/font/google';

// Google font import
const raleway = Raleway({
	subsets: ['latin'],
	variable: '--font-raleway',
});

export default function App({ Component, pageProps }) {
	return (
		<main className={`${raleway.variable}`}>
			<Component {...pageProps} />
		</main>
	);
}
