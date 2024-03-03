import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Heading from '../ui/Heading';
import Logo from '../ui/Logo';
import TourTable from '../features/tours/TourTable';

const LoginLayout = styled.main`
	min-height: 100vh;
	display: grid;
	grid-template-columns: 48rem;
	align-content: center;
	justify-content: center;
	gap: 3.2rem;
	background-color: var(--color-grey-50);
`;

function Login() {
	return (
		<LoginLayout>
			<Logo />
			<Heading as="h4">Log in to your account</Heading>
			<LoginForm />

			{/* authorization has been implemented client side, but also implement it on supabase
                change the row level policies to allow access to only authenticated users
                previously, here on the login page, if we just showed the tourtable without logging in,
                it was visible, and hence solve it by server side auth */}
			<TourTable />
		</LoginLayout>
	);
}

export default Login;
