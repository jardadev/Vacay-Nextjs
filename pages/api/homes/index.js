import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
	// Check if user is authenticated
	const session = await getServerSession(req, res, nextAuthOptions);
	if (!session) {
		return res.status(401).json({
			message: 'Unauthorized. Please sign in from the homepage.',
		});
	}

	// Create new home
	if (req.method === 'POST') {
		try {
			const { image, title, description, price, guests, beds, baths } =
				req.body;
			const user = await prisma.user.findUnique({
				where: { email: session.user.email },
			});

			const home = await prisma.home.create({
				data: {
					image,
					title,
					description,
					price,
					guests,
					beds,
					baths,
					ownerId: user.id,
				},
			});
			res.status(200).json(home);
		} catch (e) {
			res.status(500).json({ message: 'Something went wrong.' });
		}
	}
	// HTTP method not supported!
	else {
		res.setHeader('Allow', ['POST']);
		res.status(405).json({
			message: `HTTP method ${req.method} is not supported.`,
		});
	}
}
