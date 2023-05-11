import Layout from '@/components/UI/Layout';
import Grid from '@/components/UI/Grid';
import { prisma } from '@/lib/db';

export async function getServerSideProps() {
	const homes = await prisma.home.findMany();

	return {
		props: {
			homes: JSON.parse(JSON.stringify(homes)),
		},
	};
}

const Home = ({ homes = [] }) => {

	return (
		<Layout>
			<div>
				<section>
					<header className='leading-8'>
						<h2 className='font-bold text-primary'>
							Top rated places to stay:
						</h2>
						<p className='text-gray-500 text-xs lg:text-sm'>
							Explore some of the best homes in the world!
						</p>
					</header>
				</section>
				<section className='py-6'>
					<Grid homes={homes} />
				</section>
			</div>
		</Layout>
	);
};

export default Home;
