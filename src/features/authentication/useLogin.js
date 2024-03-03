import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginAPI } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginAPI({ email, password }),
		onSuccess: user => {
			queryClient.setQueryData(['user'], user.user);
			toast.success('Logged in successfully');
			navigate('/dashboard', { replace: true });
		},
		onError: err => {
			console.log(err);
			toast.error('Email or password are incorrect');
		},
	});

	return { login, isLoading };
}
