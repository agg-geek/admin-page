import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooking as getBookingAPI } from '../../services/apiBookings';

export function useBooking() {
	const { bookingId } = useParams();

	const { isLoading, data: booking } = useQuery({
		queryKey: ['booking', bookingId],
		queryFn: () => getBookingAPI(bookingId),
	});

	return { isLoading, booking };
}
