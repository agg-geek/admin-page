import { useQuery } from '@tanstack/react-query';
import { getBookings as getBookingsAPI } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
	const [searchParams] = useSearchParams();

	const filterBy = searchParams.get('status');
	// const filter =
	// 	!filterBy || filterBy === 'all' ? null : { field: 'status', value: filterBy };

	// in the apiBookings, we only applied the eq method to find equality
	// if we want to dynamically apply the method like eq, gte, lt, etc:
	const filter = { field: 'tourPrice', value: '2000', method: 'gte' };

	const { isLoading, data: bookings } = useQuery({
		queryKey: ['bookings', filter],
		queryFn: () => getBookingsAPI(filter),
	});

	return { isLoading, bookings };
}
