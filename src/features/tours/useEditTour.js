import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { editTour as editTourAPI } from '../../services/apiTours';

export function useEditTour() {
	const queryClient = useQueryClient();

	const { mutate: editTour, isLoading: isEditing } = useMutation({
		mutationFn: ({ tourId, tour }) => editTourAPI(tourId, tour),
		onSuccess: () => {
			toast.success('Cabin edited successfully');
			queryClient.invalidateQueries({
				queryKey: ['tours'],
			});
		},
		onError: err => {
			console.log(err);
			toast.error(err.message);
		},
	});

	return { editTour, isEditing };
}
