import Link from 'next/link';
import {
	HomeModernIcon,
	UserIcon,
	ChevronDownIcon,
	PlusIcon,
	HomeIcon,
	HeartIcon,
	LogoutIcon,
} from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import AuthModal from './AuthModal';
import { toast } from 'react-hot-toast';

const Nav = (props) => {
	const { openModal } = props;
	const router = useRouter();
	const { data: session, status } = useSession();

	const isLoadingUser = status === 'loading';

	let user = session?.user;

	const menuItems = [
		{
			label: 'List a new home',
			href: '/homes/create',
		},
		{
			label: 'My homes',

			href: '/homes',
		},
		{
			label: 'Favorites',

			href: '/favorites',
		},
	];

	const Icon = (icon) => {};

	return (
		<nav className='bg-base-100 shadow-md fixed w-full z-50 top-0 p-2'>
			<div className='flex items-center min-h-16 px-4 justify-between lg:container lg:mx-auto lg:text-lg'>
				<div>
					<Link href={'/'} className='flex items-center gap-1'>
						<HomeModernIcon className='h-8 text-secondary' />
						<div>
							Vacay
							<span className='text-secondary'>Nextjs</span>
						</div>
					</Link>
				</div>
				<div className='flex items-center'>
					{/* Home CRUD UI Dropdown Button */}
					<div className='dropdown dropdown-end'>
						<label
							tabIndex={0}
							className='btn btn-xs btn-ghost btn-circle'
						>
							<ChevronDownIcon />
						</label>
						<ul
							tabIndex={0}
							className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
						>
							{menuItems.map(({ label, href }) => (
								<li key={label}>
									{href ? (
										<Link href={href}>
											<div className='flex items-center space-x-2 py-2 px-4'>
												<span>{label}</span>
											</div>
										</Link>
									) : null}
								</li>
							))}
						</ul>
					</div>

					<div className='dropdown dropdown-end'>
						<label
							tabIndex={0}
							className='btn btn-ghost btn-circle avatar'
						>
							<div className='w-10 rounded-full bg-white'></div>{' '}
							{/* FIXME: Replace bg style with user image from session. */}
						</label>
						<div
							tabIndex={0}
							className='flex items-center mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow'
						>
							<div className='card-body'>
								<ThemeToggle />
								<div className='card-actions items-center text-center'>
									{user ? (
										<button
											className='btn btn-primary btn-outline w-full'
											onClick={signOut}
										>
											Logout
										</button>
									) : (
										<button
											type='button'
											onClick={openModal}
											className='ml-4 px-4 py-1 rounded-md bg-secondary hover:bg-opacity-20 focus:outline-none focus:ring-4 focus:ring-secondary-focus focus:ring-opacity-50 text-white transition'
										>
											Log in
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
