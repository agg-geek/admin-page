import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTour as createTourAPI } from '../../services/apiTours';
import toast from 'react-hot-toast';

export function useCreateTour() {
	const queryClient = useQueryClient();

	const { mutate: createTour, isLoading: isCreating } = useMutation({
		mutationFn: createTourAPI,
		onSuccess: () => {
			toast.success('Cabin created successfully');
			queryClient.invalidateQueries({
				queryKey: ['tours'],
			});
		},
		onError: err => {
			console.log(err);
			toast.error(err.message);
		},
	});

	return { createTour, isCreating };
}
