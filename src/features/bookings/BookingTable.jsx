import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useBookings } from './useBookings';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';

function BookingTable() {
	// since we need to pass the cntResults to Pagination
	// we can derive it from bookings as bookings.length
	// but we can instead query is from supabase
	const { bookings, isLoading, count } = useBookings();

	if (isLoading) return <Spinner />;

	return (
		<Menus>
			<Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
				<Table.Header>
					<div>Tour</div>
					<div>Traveller</div>
					<div>Dates</div>
					<div>Status</div>
					<div>Amount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={bookings}
					render={booking => <BookingRow key={booking.id} booking={booking} />}
				/>

				<Table.Footer>
					<Pagination cntResults={count} />
				</Table.Footer>
			</Table>
		</Menus>
	);
}

export default BookingTable;
