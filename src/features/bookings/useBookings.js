import { useQuery } from '@tanstack/react-query';
import { getBookings as getBookingsAPI } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
	// to get bookings using the applied filter and sort methods
	// we could have filtered and sorted client side, just like we did for the tours
	// here we however perform the operations using supabase
	// apiBookings cannot be used to read the searchParams, as it is a normal JS function
	// hence we are doing in this custom hook (could also be done in BookingTable)

	const [searchParams] = useSearchParams();

	const filterBy = searchParams.get('status');
	const filter =
		!filterBy || filterBy === 'all' ? null : { field: 'status', value: filterBy };

	// if we use ['bookings'] as the queryKey, then changing status from all to paid
	// won't refetch the data because react query just sees the same queryKey ['bookings']
	// hence, change the "dependency array" to include filter
	const { isLoading, data: bookings } = useQuery({
		queryKey: ['bookings', filter],
		queryFn: () => getBookingsAPI(filter),
	});

	return { isLoading, bookings };
}
