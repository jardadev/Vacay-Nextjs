import '@/styles/globals.css';
import { Nunito, Raleway } from 'next/font/google';
import { SessionProvider as AuthProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

// Google font import
const nunito = Nunito({
	subsets: ['latin'],
	variable: '--font-nunito',
});

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<>
			<AuthProvider session={session}>
				<main className={`${nunito.variable}`}>
					<Component {...pageProps} />
				</main>
			</AuthProvider>
			<Toaster />
		</>
	);
}
