import Layout from '@/components/UI/Layout';
import ListingForm from '@/components/ListingForm';

const Create = () => {
	const addHome = (data) => axios.post('/api/homes', data);

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
				<section className='py-6 max-w-md lg:max-w-lg'>
					<ListingForm
						buttonText='Add home'
						redirectPath='/'
						onSubmit={addHome}
					/>
				</section>
			</div>
		</Layout>
	);
};

export default Create;
