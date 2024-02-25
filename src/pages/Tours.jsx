import TourTable from '../features/tours/TourTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Tours() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All tours</Heading>
				<p>TEST</p>
			</Row>
			<Row>
				<TourTable />
			</Row>
		</>
	);
}

export default Tours;
