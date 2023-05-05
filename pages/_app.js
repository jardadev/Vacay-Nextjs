import '@/styles/globals.css';
import { Nunito, Raleway } from 'next/font/google';

// Google font import
const nunito = Nunito({
	subsets: ['latin'],
	variable: '--font-nunito',
});

export default function App({ Component, pageProps }) {
	return (
		<main className={`${nunito.variable}`}>
			<Component {...pageProps} />
		</main>
	);
}
