import { useQuery } from '@tanstack/react-query';
import { getBookings as getBookingsAPI } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
	const [searchParams] = useSearchParams();

	const filterBy = searchParams.get('status');
	const filter =
		!filterBy || filterBy === 'all' ? null : { field: 'status', value: filterBy };

	const sortBy = searchParams.get('sort') || 'startDate-desc';
	const [sortField, sortDirection] = sortBy.split('-');
	const sort = { field: sortField, direction: sortDirection };

	// notice we pass a default {} value to data because then
	// while destructuring data, data might actually not have loaded
	const { isLoading, data: { data: bookings, count } = {} } = useQuery({
		queryKey: ['bookings', filter, sort],
		queryFn: () => getBookingsAPI(filter, sort),
	});

	return { isLoading, bookings, count };
}
