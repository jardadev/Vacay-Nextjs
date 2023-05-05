import Nav from './Nav';

const Layout = ({ children }) => {
	return (
		<div className='min-h-screen flex flex-col font-raleway'>
			<Nav />
			<main className='lg:container lg:mx-auto'>{children}</main>
		</div>
	);
};

export default Layout;
