import { prisma } from '@/lib/db';
import Layout from '@/components/UI/Layout';
import Grid from '@/components/UI/Grid';

const Home = ({ homes = [] }) => {
	return (
		<Layout>
			<h1 className='text-xl font-medium text-gray-800'>Your listings</h1>
			<p className='text-gray-500'>
				Manage your homes and update your listings
			</p>
			<div className='mt-8'>
				<Grid homes={homes} />
			</div>
		</Layout>
	);
};

export default Home;
