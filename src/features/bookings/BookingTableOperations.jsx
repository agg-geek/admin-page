import Sort from '../../ui/Sort';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function BookingTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField="status"
				options={[
					{ value: 'all', label: 'All' },
					{ value: 'paid', label: 'Paid' },
					{ value: 'tour-started', label: 'Tour started' },
					{ value: 'tour-ended', label: 'Tour ended' },
				]}
			/>

			<Sort
				options={[
					{ value: 'startDate-desc', label: 'Sort by date (latest first)' },
					{ value: 'startDate-asc', label: 'Sort by date (oldest first)' },
					{ value: 'price-desc', label: 'Sort by amount (descending)' },
					{ value: 'price-asc', label: 'Sort by amount (ascending)' },
				]}
			/>
		</TableOperations>
	);
}

export default BookingTableOperations;
