import styled from 'styled-components';
import BookingDataBox from '../bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function StartTour() {
	const moveBack = useMoveBack();

	const booking = {};

	const {
		id: bookingId,
		travellers,
		totalPrice,
		numTravellers,
		hasFood,
		numDays,
	} = booking;

	function handleStartTour() {}

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Start tour #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				<Button onClick={handleStartTour}>Start tour #{bookingId}</Button>
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default StartTour;
