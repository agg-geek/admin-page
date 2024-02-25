import supabase from './supabase';

export async function getTours() {
	const { data: tours, error } = await supabase.from('tours').select('*');

	if (error) {
		console.log(error);
		throw new Error('Could not get tours');
	}

	return tours;
}

export async function deleteTour(tourId) {
	const { error } = await supabase.from('tours').delete().eq('id', tourId);

	if (error) {
		console.log(error);
		throw new Error('Could not delete tour');
	}

	return null;
}
