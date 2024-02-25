import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getTours } from '../../services/apiTours';
import Spinner from '../../ui/Spinner';
import TourRow from './TourRow';

const Table = styled.div`
	border: 1px solid var(--color-grey-200);

	font-size: 1.4rem;
	background-color: var(--color-grey-0);
	border-radius: 7px;
	overflow: hidden;
`;

const TableHeader = styled.header`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;

	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-grey-600);
	padding: 1.6rem 2.4rem;
`;

function TourTable() {
	const data = useQuery({
		queryKey: ['tours'],
		queryFn: getTours,
	});

	const { isLoading, data: tours, error } = data;
	// console.log(tours);

	if (isLoading) return <Spinner />;

	return (
		<Table>
			<TableHeader>
				<div>Image</div>
				<div>Tour</div>
				<div>Group size</div>
				<div>Price</div>
				<div>Discount</div>
			</TableHeader>
			{tours.map(tour => (
				<TourRow tour={tour} key={tour.id} />
			))}
		</Table>
	);
}
export default TourTable;
