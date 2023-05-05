import Nav from './Nav';

const Layout = ({ children }) => {
	return (
		<div className='min-h-screen flex flex-col font-raleway'>
			<Nav />
			<div className='px-4 py-12 lg:container lg:mx-auto'>
				<main className=''>{children}</main>
			</div>
		</div>
	);
};

export default Layout;
