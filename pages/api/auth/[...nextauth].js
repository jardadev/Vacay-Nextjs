import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/db';
import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';

export const nextAuthOptions = {
	// Redirects back to home page
	pages: {
		signIn: '/',
		signOut: '/',
		error: '/',
		verifyRequest: '/',
	},
	providers: [
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
			maxAge: 10 * 60, // Magic links are valid for 10 min only
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	callbacks: {
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token and user id from a provider.
			session.user.id = user.id;
			return session;
		},
	},
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(nextAuthOptions);
