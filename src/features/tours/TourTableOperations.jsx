import Filter from '../../ui/Filter';
import Sort from '../../ui/Sort';
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
			<Sort
				options={[
					{ value: 'name-asc', label: 'Sort by name (A-Z)' },
					{ value: 'name-desc', label: 'Sort by name (Z-A)' },
					{ value: 'price-asc', label: 'Sort by price (Ascending)' },
					{ value: 'price-desc', label: 'Sort by price (Descending)' },
					{
						value: 'maxGroupSize-asc',
						label: 'Sort by group size (Ascending)',
					},
					{
						value: 'maxGroupSize-desc',
						label: 'Sort by group size (Descending)',
					},
				]}
			/>
		</TableOperations>
	);
}
export default TourTableOperations;
