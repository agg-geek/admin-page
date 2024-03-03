import supabase from './supabase';

export async function getTours() {
	const { data: tours, error } = await supabase.from('tours').select('*');

	if (error) {
		console.log(error);
		throw new Error('Could not get tours');
	}

	return tours;
}

export async function createTour(newTour) {
	const imageName = `${Date.now()}-${newTour.image.name}`.replaceAll('/', '');
	const imagePath = `https://wmgtcgsvahqwnwxndxwr.supabase.co/storage/v1/object/public/tour-images/${imageName}`;

	const { data: createdTour, error: tourError } = await supabase
		.from('tours')
		.insert([{ ...newTour, image: imagePath }])
		.select();

	if (tourError) {
		console.log(tourError);
		throw new Error('Tour could not be created');
	}

	const { error: imageError } = await supabase.storage
		.from('tour-images')
		.upload(imageName, newTour.image);

	if (imageError) {
		console.log(imageError);
		await supabase.from('tours').delete().eq('id', createdTour.id);
		throw new Error('Tour image could not be uploaded, deleting tour...');
	}

	return createdTour;
}

export async function editTour(tourId, tour) {
	const containsImage = typeof tour.image !== 'string';

	const imageName = containsImage
		? `${Date.now()}-${tour.image.name}`.replaceAll('/', '')
		: null;

	const imagePath = containsImage
		? `https://wmgtcgsvahqwnwxndxwr.supabase.co/storage/v1/object/public/tour-images/${imageName}`
		: tour.image;

	const { data: updatedTour, error: tourError } = await supabase
		.from('tours')
		.update({ ...tour, image: imagePath })
		.eq('id', tourId)
		.select();

	if (tourError) {
		console.log(tourError);
		throw new Error('Tour could not be edited');
	}

	if (containsImage) {
		const { error: imageError } = await supabase.storage
			.from('tour-images')
			.upload(imageName, tour.image);

		if (imageError) {
			console.log(imageError);
			await supabase.from('tours').delete().eq('id', tour.id);
			throw new Error('Tour image could not be uploaded, deleting tour...');
		}
	}

	return updatedTour;
}

export async function deleteTour(tourId) {
	const { error } = await supabase.from('tours').delete().eq('id', tourId);

	if (error) {
		console.log(error);
		throw new Error('Could not delete tour');
	}

	return null;
}
