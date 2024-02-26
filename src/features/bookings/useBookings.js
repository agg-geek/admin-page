import { useQuery } from '@tanstack/react-query';
import { getBookings as getBookingsAPI } from '../../services/apiBookings';

export function useBookings() {
	const { isLoading, data: bookings } = useQuery({
		queryKey: ['bookings'],
		queryFn: getBookingsAPI,
	});

	return { isLoading, bookings };
}
