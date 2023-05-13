import { prisma } from '@/lib/db';
import { getSession } from 'next-auth/react';
import Layout from '@/components/UI/Layout';
import Grid from '@/components/UI/Grid';

const Home = ({ homes = [] }) => {
	return (
		<Layout>
			<h1 className='text-xl font-medium text-primary'>Your listings</h1>
			<p className='text-secondary'>
				Manage your homes and update your listings
			</p>
			<div className='mt-8'>
				<Grid homes={homes} />
			</div>
		</Layout>
	);
};

export default Home;

export async function getServerSideProps(context) {
	// Check if user is authenticated
	const session = await getSession(context);

	// If not, redirect to the homepage
	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	// Get all homes of authenticated user
	const homes = await prisma.home.findMany({
		where: { owner: { email: session.user.email } },
		orderBy: { createdAt: 'desc' },
	});

	return {
		props: {
			homes: JSON.parse(JSON.stringify(homes)),
		},
	};
}
