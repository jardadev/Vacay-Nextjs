import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../api/auth/[...nextauth]';
import { prisma } from '@/lib/db';

export default async function handler(req, res) {
	// Check if user is authenticated
	const session = await getServerSession(req, res, nextAuthOptions);
	if (!session) {
		return res.status(401).json({
			message: 'Unauthorized. Please sign in from the homepage.',
		});
	}
	const { homeId } = req.query;

	if (req.method === 'GET') {
		const user = await prisma.user.findUnique({
			where: {
				id: session.user.id,
			},
			include: {
				favorites: true,
			},
		});
		console.log(user);
	}
	// Create new home
	if (req.method === 'POST') {
		try {
			console.log('made it here');
			const user = await prisma.user.update({
				where: { id: session.user.id },
				data: {
					favorites: {
						create: [{ homeId: 'clgl6bi1v0000rfuir0mymr7h' }],
					},
				},
				include: {
					favorites: true,
				},
			});
			console.log(user);
			res.status(200).json(user);
		} catch (e) {
			res.status(500).json({ message: 'Something went wrong.' });
		}
	}
}
