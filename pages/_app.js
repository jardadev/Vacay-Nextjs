import '@/styles/globals.css';
import { Comfortaa } from 'next/font/google';
import { SessionProvider as AuthProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

// Google fonts import
const comfortaa = Comfortaa({
	subsets: ['latin'],
});

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<>
			<AuthProvider session={session}>
				<main className={comfortaa.className}>
					<Component {...pageProps} />
				</main>
			</AuthProvider>
			<Toaster />
		</>
	);
}
