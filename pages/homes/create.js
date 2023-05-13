import Layout from '@/components/UI/Layout';
import ListingForm from '@/components/ListingForm';
import { getSession } from 'next-auth/react';
import axios from 'axios';

const Create = () => {
	const addHome = (data) => axios.post('/api/homes', data);

	return (
		<Layout>
			<div>
				<section className='max-w-screen-sm mx-auto'>
					<h1 className='text-xl font-medium text-primary'>
						List your home
					</h1>
					<p className='text-secondary'>
						Fill out the form below to list a new home.
					</p>
					<div className='mt-8'>
						<ListingForm
							buttonText='Add home'
							redirectPath='/'
							onSubmit={addHome}
						/>
					</div>
				</section>
			</div>
		</Layout>
	);
};

export default Create;

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
	return {
		props: {},
	};
}
