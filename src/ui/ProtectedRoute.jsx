import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	const navigate = useNavigate();

	const { isLoading, isAuthenticated } = useUser();

	useEffect(
		function () {
			if (!isLoading && !isAuthenticated) {
				toast.error('You need to login first!');
				navigate('/login');
			}
		},
		[isLoading, isAuthenticated, navigate]
	);

	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	if (isAuthenticated) return children;
}

export default ProtectedRoute;
