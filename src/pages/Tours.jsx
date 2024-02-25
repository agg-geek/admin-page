import { useEffect } from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { getTours } from '../services/apiTours';

function Tours() {
	// we won't have any such useeffects side effects in components / pages
	// we will use react query for this data fetching, this is just for testing purposes

	useEffect(function () {
		getTours()
			.then(data => console.log(data))
			.catch(err => console.log(err));
	}, []);

	return (
		<Row type="horizontal">
			<Heading as="h1">All tours</Heading>
			<p>TEST</p>
		</Row>
	);
}

export default Tours;
