import { getToday } from '../utils/helpers';
import supabase from './supabase';
import { RESULTS_PER_PAGE } from '../utils/constants';

export async function getBookings(filter, sort, page) {
	let query = supabase
		.from('bookings')
		.select('*, tours(name), travellers(fullName, email)', {
			count: 'exact',
		});

	if (filter) query = query.eq(filter.field, filter.value);
	if (sort) query = query.order(sort.field, { ascending: sort.direction === 'asc' });
	if (page) {
		const from = (page - 1) * RESULTS_PER_PAGE;
		const to = page * RESULTS_PER_PAGE - 1;
		query = query.range(from, to);
	}

	const { data, error, count } = await query;

	if (error) {
		console.log(error);
		throw new Error('Bookings could not loaded');
	}

	return { data, count };
}

// getBooking from supabase
export async function getBooking(id) {
	const { data, error } = await supabase
		.from('bookings')
		.select('*, tours(*), travellers(*)')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		throw new Error('Booking not found');
	}

	return data;
}

// Returns all BOOKINGS that are were created after the given date.
// Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
	const { data, error } = await supabase
		.from('bookings')
		.select('created_at, totalPrice, addedPrice')
		.gte('created_at', date)
		.lte('created_at', getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error('Bookings could not be loaded');
	}

	return data;
}

// Returns all tours that are started after the given date
export async function getToursAfterDate(date) {
	const { data, error } = await supabase
		.from('bookings')
		// .select('*')
		// .select('*, travellers(fullName)')
		.select('*, tours(name), travellers(fullName)')
		.gte('startDate', date)
		.lte('startDate', getToday());

	if (error) {
		console.error(error);
		throw new Error('Bookings could not be loaded');
	}

	return data;
}

// Activity means that a tour started or tour ended today
export async function getActivity() {
	const { data, error } = await supabase
		.from('bookings')
		.select(
			'*, travellers(fullName, nationality, userPhoto), tours(name, description)'
		)
		.or(
			`and(status.eq.paid,startDate.eq.${getToday()}),and(status.eq.tour-started,endDate.eq.${getToday()})`
		)
		.order('created_at');

	// Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
	// (stay.status === 'paid' && isToday(new Date(stay.startDate))) ||
	// (stay.status === 'tour-started' && isToday(new Date(stay.endDate)))

	if (error) {
		console.error(error);
		throw new Error('Bookings could not be loaded');
	}
	return data;
}

export async function updateBooking(id, obj) {
	const { data, error } = await supabase
		.from('bookings')
		.update(obj)
		.eq('id', id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error('Booking could not be updated');
	}
	return data;
}

export async function deleteBooking(id) {
	// REMEMBER RLS POLICIES
	const { data, error } = await supabase.from('bookings').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Booking could not be deleted');
	}
	return data;
}
