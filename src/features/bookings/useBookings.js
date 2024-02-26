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

	const page = +searchParams.get('page') || 1;

	const { isLoading, data: { data: bookings, count } = {} } = useQuery({
		queryKey: ['bookings', filter, sort, page],
		queryFn: () => getBookingsAPI(filter, sort, page),
	});

	return { isLoading, bookings, count };
}
