import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function TourTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField={'filter'}
				options={[
					{ label: 'All', value: 'all' },
					{ label: 'With discount', value: 'with-discount' },
					{ label: 'No discount', value: 'no-discount' },
				]}
			/>
		</TableOperations>
	);
}
export default TourTableOperations;
