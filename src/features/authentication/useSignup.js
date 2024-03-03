import { useMutation } from '@tanstack/react-query';
import { signup as signupAPI } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

export function useSignup() {
	const { mutate: signup, isLoading } = useMutation({
		mutationFn: signupAPI,
		onSuccess: () => {
			toast.success('Please verify your account to confirm account creation!');
		},
	});

	return { signup, isLoading };
}
