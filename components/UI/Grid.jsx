import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Card from './Card';

const Grid = ({ homes = [] }) => {
	const [favorites, setFavorites] = useState([]);
	const { data: session, status } = useSession();
	const isEmpty = homes.length === 0;

	// Gets User Favorites
	useEffect(() => {
		if (session) {
			(async () => {
				const favoriteList = (await axios.get('/api/users/favorites'))
					.data;
				setFavorites(favoriteList.map((favorite) => favorite.id));
			})();
		}
	}, [session]);

	const toggleFavorite = async (id) => {
		if (favorites.includes(id)) {
			setFavorites((prev) => prev.filter((prev) => prev !== id));
			let result = await axios
				.delete('/api/users/favorites', {
					deleteId: id,
				})
				.catch((error) => console.log(error.response));
		} else {
			setFavorites((prev) => [...prev, id]);
			let result = await axios
				.post(`/api/users/favorites`, {
					addId: id,
				})
				.catch((error) => console.log(error.response));
		}
	};

	return isEmpty ? (
		<p className='text-error-content bg-warning px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1'>
			<ExclamationCircleIcon className='shrink-0 w-5 h-5 mt-px' />
			<span className='text-xs lg:text-sm'>
				Unfortunately, there is nothing to display yet.
			</span>
		</p>
	) : (
		<div className='grid justify-center items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
			{homes.map((home) => (
				<Card
					key={home.id}
					{...home}
					onClickFavorite={toggleFavorite}
					favorite={!!favorites.includes(home.id)}
				/>
			))}
		</div>
	);
};

export default Grid;
