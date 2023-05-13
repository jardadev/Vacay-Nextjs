import Layout from '@/components/UI/Layout';
import Grid from '@/components/UI/Grid';
import { prisma } from '@/lib/db';

const Home = ({ homes = [] }) => {
	return (
		<Layout>
			<div>
				<section>
					<header className='leading-8'>
						<h1 className='text-xl font-medium text-primary'>
							Top rated places to stay
						</h1>
						<p className='text-secondary'>
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

export async function getServerSideProps() {
	const homes = await prisma.home.findMany();

	return {
		props: {
			homes: JSON.parse(JSON.stringify(homes)),
		},
	};
}
