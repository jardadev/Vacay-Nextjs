import Nav from './Nav';

const Layout = ({ children }) => {
	return (
		<div className='min-h-screen flex flex-col font-raleway'>
			<Nav />
			{children}
		</div>
	);
};

export default Layout;
