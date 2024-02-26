import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import { HiEye } from 'react-icons/hi2';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';

const Tour = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`;

const Amount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
`;

function BookingRow({ booking }) {
	const navigate = useNavigate();

	const {
		id: bookingId,
		startDate,
		endDate,
		numDays,
		tourPrice,
		status,
		travellers: { fullName: travellerName, email },
		tours: { name: tourName },
	} = booking;

	const statusToTagName = {
		paid: 'blue',
		'tour-started': 'green',
		'tour-ended': 'silver',
	};

	return (
		<Table.Row>
			<Tour>{tourName}</Tour>

			<Stacked>
				<span>{travellerName}</span>
				<span>{email}</span>
			</Stacked>

			<Stacked>
				<span>
					{isToday(new Date(startDate))
						? 'Today'
						: formatDistanceFromNow(startDate)}{' '}
					&rarr; {numDays} day tour
				</span>
				<span>
					{format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
					{format(new Date(endDate), 'MMM dd yyyy')}
				</span>
			</Stacked>

			<Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

			<Amount>{formatCurrency(tourPrice)}</Amount>

			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={bookingId} />
					<Menus.List id={bookingId}>
						<Menus.Button
							icon={<HiEye />}
							onClick={() => navigate(`/bookings/${bookingId}`)}
						>
							See details
						</Menus.Button>
					</Menus.List>
				</Menus.Menu>
			</Modal>
		</Table.Row>
	);
}

export default BookingRow;
