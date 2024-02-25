import { useState } from 'react';
import TourTable from '../features/tours/TourTable';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CreateTourForm from '../features/tours/CreateTourForm';

function Tours() {
	const [showForm, setShowForm] = useState(false);

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All tours</Heading>
				<p>TEST</p>
			</Row>
			<Row>
				<TourTable />
				<Button onClick={() => setShowForm(s => !s)}>New tour</Button>

				{showForm && <CreateTourForm />}
			</Row>
		</>
	);
}

export default Tours;
