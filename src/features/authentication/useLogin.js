import { useMutation } from '@tanstack/react-query';
import { login as loginAPI } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
	const navigate = useNavigate();

	const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginAPI({ email, password }),
		onSuccess: () => {
			toast.success('Logged in successfully');
			navigate('/');
		},
		onError: err => {
			console.log(err);
			toast.error('Email or password are incorrect');
		},
	});

	return { login, isLoading };
}
