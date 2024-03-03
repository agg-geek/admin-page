import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings as getBookingsAPI } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { RESULTS_PER_PAGE } from '../../utils/constants';

export function useBookings() {
	const queryClient = useQueryClient();
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

	const cntPages = Math.ceil(count / RESULTS_PER_PAGE);
	if (page != cntPages) {
		queryClient.prefetchQuery({
			queryKey: ['bookings', filter, sort, page + 1],
			queryFn: () => getBookingsAPI(filter, sort, page + 1),
		});
	}

	return { isLoading, bookings, count };
}
