import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateTourForm from './CreateTourForm';
import TourTable from './TourTable';

function CreateTour() {
	// we use Compound components for the modal the modal itself
	// should contain the state and logic to open/close the modal

	// Modal.Open is the button to open the modal
	// and Modal.Window is the modal window itself
	// here we have multiple buttons which open different windows
	// hence pass the opens prop
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
