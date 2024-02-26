import TourTable from '../features/tours/TourTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CreateTour from '../features/tours/CreateTour';
import TourTableOperations from '../features/tours/TourTableOperations';

function Tours() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All tours</Heading>
				<TourTableOperations />
			</Row>
			<Row>
				<TourTable />
				<CreateTour />
			</Row>
		</>
	);
}

export default Tours;
