import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Card from './Card';

const Grid = ({ homes = [] }) => {
	const isEmpty = homes.length === 0;

	return isEmpty ? (
		// FIXME: Replace warning styles
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
					// onClickFavorite={toggleFavorite}
					// favorite={!!favorites.includes(home.id)}
					favorite={true}
				/>
			))}
		</div>
	);
};

export default Grid;
