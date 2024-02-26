import { useSearchParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import TourRow from './TourRow';
import { useTours } from './useTours';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

function TourTable() {
	const { isLoading, tours } = useTours();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	const filterBy = searchParams.get('filter') || 'all';

	let filteredTours;
	if (filterBy === 'all') filteredTours = tours;
	if (filterBy === 'with-discount')
		filteredTours = tours.filter(tour => tour.discount > 0);
	if (filterBy === 'no-discount')
		filteredTours = tours.filter(tour => tour.discount === 0);

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div>Image</div>
					<div>Tour</div>
					<div>Group size</div>
					<div>Price</div>
					<div>Discount</div>
				</Table.Header>

				<Table.Body
					data={filteredTours}
					render={tour => <TourRow tour={tour} key={tour.id} />}
				/>
			</Table>
		</Menus>
	);
}
export default TourTable;
