import { useState } from 'react';
import Button from '../../ui/Button';
import CreateTourForm from './CreateTourForm';
import Modal from '../../ui/Modal';

function CreateTour() {
	// CreateTour component will just add a button to open the modal
	// this is subpar, as this component then needs to worry about state management
	// if we want to reuse the modal open / close technique somewhere else,
	// then that component again needs to have this state and logic to open the modal

	const [isOpenModal, setIsOpenModal] = useState(false);

	function closeModal() {
		setIsOpenModal(false);
	}

	return (
		<div>
			<Button onClick={() => setIsOpenModal(s => !s)}>New tour</Button>
			{isOpenModal && (
				<Modal onClose={closeModal}>
					<CreateTourForm onCloseModal={closeModal} />
				</Modal>
			)}
		</div>
	);
}
export default CreateTour;
