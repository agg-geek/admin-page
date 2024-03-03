import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
	const queryClient = useQueryClient();

	const { mutate: updateUser, isLoading: isUpdating } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: ({ user }) => {
			queryClient.setQueryData(['user'], user);
			toast.success('Account successfully updated');
		},
		onError: err => toast.error(err.message),
	});

	return { updateUser, isUpdating };
}
