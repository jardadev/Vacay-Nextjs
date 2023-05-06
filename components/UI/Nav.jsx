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


const Nav = () => {
	const menuItems = [
		{
			label: 'List a new home',
			icon: PlusIcon,
			href: '/homes/create',
		},
		{
			label: 'My homes',
			icon: HomeIcon,
			href: '/homes',
		},
		{
			label: 'Favorites',
			icon: HeartIcon,
			href: '/favorites',
		},
		{
			label: 'Logout',
			icon: LogoutIcon,
			onClick: null,
		},
	];

	return (
		<nav className='shadow-md'>
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
							{menuItems.map(({ label, href, icon: Icon }) => (
								<li key={label}>
									{href && (
										<Link href={href}>
											<div className='flex items-center space-x-2 py-2 px-4'>
												<Icon className='w-5 h-5 shrink-0 text-gray-500' />
												<span>{label}</span>
											</div>
										</Link>
									)}
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
									<button className='btn btn-primary btn-outline w-full'>
										Logout
									</button>
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
