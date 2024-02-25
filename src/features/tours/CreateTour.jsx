import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateTourForm from './CreateTourForm';
import TourTable from './TourTable';

function CreateTour() {
	return (
		<Modal>
			<Modal.Open opens="create-tour-form">
				<Button>Create new tour</Button>
			</Modal.Open>
			<Modal.Window name="create-tour-form">
				<CreateTourForm />
			</Modal.Window>

			<Modal.Open opens="tours-table">
				<Button>Show tours</Button>
			</Modal.Open>
			<Modal.Window name="tours-table">
				<TourTable />
			</Modal.Window>
		</Modal>
	);
}
export default CreateTour;
