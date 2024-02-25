import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteTour as deleteTourAPI } from '../../services/apiTours';

export function useDeleteTour() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteTour } = useMutation({
		mutationFn: deleteTourAPI,
		onSuccess: () => {
			toast.success('Cabin was deleted successfully');
			queryClient.invalidateQueries({
				queryKey: ['tours'],
			});
		},
		onError: err => {
			console.log(err);
			toast.error(err.message);
		},
	});

	return { isDeleting, deleteTour };
}
