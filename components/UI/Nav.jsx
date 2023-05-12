import Link from 'next/link';
import Image from 'next/image';
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
import { useSession, signOut } from 'next-auth/react';

const Nav = (props) => {
	const { openModal } = props;
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
							{isLoadingUser ? (
								<UserIcon className='w-10 rounded-full animate-pulse text-primary' />
							) : !user ? (
								<UserIcon className='w-10 rounded-full text-primary' />
							) : (
								<Image
									src={user?.image}
									alt={user?.name || 'Avatar'}
									width={80}
									height={80}
									className='rounded-full w-10'
								/>
							)}
						</label>
						<div
							tabIndex={0}
							className='flex items-center mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow'
						>
							<div className='card-body absolute right-0 w-68 overflow-hidden mt-1  origin-top-right bg-base-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
								{/* <div className='flex'>
									<div className='w-10 px-4 items-center justify-center'>
										<Image
											src={user?.image}
											alt={user?.name || 'Avatar'}
											width={80}
											height={80}
											className='rounded-full'
										/>
									</div>
									<div className='flex flex-col '>
										<span>{user?.name}</span>
										<span>{user?.email}</span>
									</div>
								</div> */}
								<div className='flex items-center space-x-2 py-4 px-4 mb-2'>
									<div className='shrink-0 flex items-center justify-center rounded-full overflow-hidden relative bg-gray-200 w-9 h-9'>
										{user?.image ? (
											<Image
												src={user?.image}
												alt={user?.name || 'Avatar'}
												height={80}
												width={80}
											/>
										) : (
											<UserIcon className='text-gray-400 w-6 h-6' />
										)}
									</div>
									<div className='flex flex-col truncate'>
										<span>{user?.name || 'Guest'}</span>
										<span className='text-sm text-gray-500'>
											{user?.email || 'Please sign in.'}
										</span>
									</div>
								</div>
								<ThemeToggle />
								<div className='card-actions justify-center items-center text-center'>
									{user ? (
										<button
											className='btn btn-error btn-outline btn-sm hover:bg-opacity-20 focus:outline-none focus:ring-4 focus:ring-error-content focus:ring-opacity-50 text-white transition'
											onClick={signOut}
										>
											Logout
										</button>
									) : (
										<button
											type='button'
											onClick={openModal}
											className='btn btn-primary btn-outline btn-sm hover:bg-opacity-20 focus:outline-none focus:ring-4 focus:ring-error-content focus:ring-opacity-50 text-white transition'
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
