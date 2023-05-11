import Nav from './Nav';
import AuthModal from './AuthModal';
import { useState } from 'react';

const Layout = ({ children }) => {
	const [showModal, setShowModal] = useState(false);
	const openModal = () => setShowModal(true);
	const closeModal = () => setShowModal(false);

	return (
		<div className='min-h-screen flex flex-col'>
			<Nav openModal={openModal} />
			<div className='px-4 py-24 lg:container lg:mx-auto'>
				<main>
					{typeof children === 'function'
						? children(openModal)
						: children}
				</main>
				<AuthModal show={showModal} onClose={closeModal} />
			</div>
		</div>
	);
};

export default Layout;
