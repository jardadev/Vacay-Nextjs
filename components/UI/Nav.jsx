import Link from 'next/link';
import {
	HomeModernIcon,
	UserIcon,
	ChevronDownIcon,
} from '@heroicons/react/24/outline';

const Nav = () => {
	return (
		<nav className='h-16 w-full shadow-md'>
			<div className='h-full container mx-auto px-4 flex justify-between items-center space-x-4'>
				<div className='flex space-x-1 items-center'>
					<HomeModernIcon className='shrink-0 w6 h-6 text-rose-500' />
					<Link href={'/'} className='text-lg font-bold'>
						VacayNextJs
					</Link>
				</div>
				<div className='flex items-center justify-between'>
					<UserIcon className='shrink-0 w-8 h-8 text-grey-500' />
					<ChevronDownIcon className='w-4 h-4 text-black' />
				</div>
			</div>
		</nav>
	);
};

export default Nav;
