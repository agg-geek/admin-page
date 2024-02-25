import { useQuery } from '@tanstack/react-query';
import { getTours as getToursAPI } from '../../services/apiTours';

export function useTours() {
	const { isLoading, data: tours } = useQuery({
		queryKey: ['tours'],
		queryFn: getToursAPI,
	});

	return { isLoading, tours };
}
