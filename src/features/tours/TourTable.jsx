import Spinner from '../../ui/Spinner';
import TourRow from './TourRow';
import { useTours } from './useTours';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

function TourTable() {
	const { isLoading, tours } = useTours();

	if (isLoading) return <Spinner />;

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

				{/* use the render prop pattern to render the tours in table */}
				<Table.Body
					data={tours}
					render={tour => <TourRow tour={tour} key={tour.id} />}
				/>
			</Table>
		</Menus>
	);
}
export default TourTable;
