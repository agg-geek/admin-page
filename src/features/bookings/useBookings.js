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

	const { isLoading, data: bookings } = useQuery({
		queryKey: ['bookings', filter, sort],
		queryFn: () => getBookingsAPI(filter, sort),
	});

	return { isLoading, bookings };
}
