import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateTourForm from './CreateTourForm';

function CreateTour() {
	return (
		<div>
			<Modal>
				<Modal.Open opens="create-tour-form">
					<Button>Create new tour</Button>
				</Modal.Open>
				<Modal.Window name="create-tour-form">
					<CreateTourForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}
export default CreateTour;
