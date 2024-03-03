import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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

	// navigate to /login if not authenticated
	// since navigate cannot be used at the top level of the component
	// and only inside a fn or effect, use useeffect
	useEffect(
		function () {
			// if (!isLoading && !isAuthenticated) navigate('/login');
			console.log('useeffect, navigate to login');

			if (!isAuthenticated && !isLoading) navigate('/login');
		},
		// [isLoading, isAuthenticated, navigate]
		[isAuthenticated, isLoading, navigate]
	);

	console.log('before isloading');

	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	console.log('before isauth');
	if (isAuthenticated) return children;
}

export default ProtectedRoute;
