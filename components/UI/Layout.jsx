import Nav from './Nav';

const Layout = ({ children }) => {
	return (
		<div className='min-h-screen flex flex-col font-raleway'>
			<Nav />
			<div className='flex-grow container'>
				<main className='py-12 lg:px-4'>{children}</main>
			</div>
		</div>
	);
};

export default Layout;
