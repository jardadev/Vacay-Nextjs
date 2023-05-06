import Nav from './Nav';

const Layout = ({ children }) => {
	return (
		<div className='min-h-screen flex flex-col'>
			<Nav />
			<div className='px-4 py-12 lg:container lg:mx-auto'>
				<main>{children}</main>
			</div>
		</div>
	);
};

export default Layout;
