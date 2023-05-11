import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../auth/[...nextauth]';
import { prisma } from '@/lib/db';

export default async function handler(req, res) {
	// Check if user is authenticated
	const session = await getServerSession(req, res, nextAuthOptions);
	if (!session) {
		return res.status(401).json({
			message: 'Unauthorized. Please sign in from the homepage.',
		});
	}

	if (req.method === 'GET') {
		try {
			// Retrieve User Favorites
			const homes = await prisma.user
				.findUnique({
					where: { id: session.user.id },
					select: { favorites: true },
				})
				.catch((e) => console.log(e));
			// Retrieve Home Ids from user favorite array, creating a new array.
			const favoriteHomeIdArray = homes.favorites.map(
				(home) => home.homeId
			);

			// Return the Home records of each id passed in favHomeIdArray.
			const favoriteHomes = await prisma.home.findMany({
				where: {
					id: { in: favoriteHomeIdArray },
				},
			});
			const favoriteHomesParsed = JSON.parse(
				JSON.stringify(favoriteHomes)
			);
			res.status(200).json(favoriteHomesParsed);
		} catch (e) {
			res.status(500).json({ message: 'Something went wrong.' });
		}
	} else if (req.method === 'POST') {
		try {
			const { addId } = req.body;
			const updatedFavorites = await prisma.favoritesOnHome.create({
				data: {
					homeId: addId,
					favoritedById: session.user.id,
				},
			});
			res.status(201).json(updatedFavorites);
		} catch (e) {
			res.status(500).json({ e });
		}
	} else if (req.method === 'DELETE') {
		try {
			const { deleteId } = req.body;

			const removeFavorite = await prisma.favoritesOnHome.deleteMany({
				where: {
					homeId: deleteId,
					favoritedById: session.user.id,
				},
			});

			res.status(200);
		} catch (e) {
			res.status(500).json({ message: 'Failed to remove favorite.' });
		}
	}

	// HTTP method not supported!
	else {
		res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
		res.status(405).json({
			message: `HTTP method ${req.method} is not supported.`,
		});
	}
}
