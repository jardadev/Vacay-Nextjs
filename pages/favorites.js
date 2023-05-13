import { getSession } from 'next-auth/react';
import Layout from '@/components/UI/Layout';
import Grid from '@/components/UI/Grid';
import { prisma } from '@/lib/db';

export async function getServerSideProps(context) {
	// Check if user is authenticated
	const session = await getSession(context);

	// User NOT authenticated
	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	// Retrieve User Favorites
	const homes = await prisma.user
		.findUnique({
			where: { id: session.user.id },
			select: { favorites: true },
		})
		.catch(console.error);

	// Retrieve Home Ids from user favorite array, creating a new array.
	const favoriteHomeIdArray = homes.favorites.map((home) => home.homeId);

	// Return the Home records of each id passed in favHomeIdArray.
	const favoriteHomes = await prisma.home.findMany({
		where: {
			id: { in: favoriteHomeIdArray },
		},
	});

	return {
		props: {
			favoriteHomes: JSON.parse(JSON.stringify(favoriteHomes)),
		},
	};
}

const Favorites = ({ favoriteHomes = [] }) => {
	return (
		<Layout>
			<h1 className='text-xl font-medium text-primary'>Your Favorites</h1>
			<p className='text-secondary'>View your favorite listings!</p>
			<div className='mt-8'>
				<Grid homes={favoriteHomes} />
			</div>
		</Layout>
	);
};

export default Favorites;
