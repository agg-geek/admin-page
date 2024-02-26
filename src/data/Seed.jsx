import { useState } from 'react';
import { isFuture, isPast, isToday } from 'date-fns';
import supabase from '../services/supabase';
import Button from '../ui/Button';
import { subtractDates } from '../utils/helpers';

import { bookings } from './data-bookings';
import { tours } from './data-tours';
import { travellers } from './data-travellers';

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxTravellersPerBooking: 10,
//   foodPrice: 15,
// };

async function deleteTravellers() {
	const { error } = await supabase.from('travellers').delete().gt('id', 0);
	if (error) console.log(error.message);
	// else console.log('Travellers deleted successfully');
}

async function deleteTours() {
	const { error } = await supabase.from('tours').delete().gt('id', 0);
	if (error) console.log(error.message);
	// else console.log('Tours deleted successfully');
}

async function deleteBookings() {
	const { error } = await supabase.from('bookings').delete().gt('id', 0);
	if (error) console.log(error.message);
	// else console.log('Bookings deleted successfully');
}

async function createTravellers() {
	const { error } = await supabase.from('travellers').insert(travellers);
	if (error) console.log(error.message);
	// else console.log('Travellers created successfully');
}

async function createTours() {
	const { error } = await supabase.from('tours').insert(tours);
	if (error) console.log(error.message);
	// else console.log('Tours created successfully');
}

async function createBookings() {
	// Bookings need a travellerId and a tourId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all travellerIds and tourIds, and then replace the original IDs in the booking data with the actual ones from the DB
	const { data: travellersIds } = await supabase
		.from('travellers')
		.select('id')
		.order('id');
	const allTravellerIds = travellersIds.map(tour => tour.id);
	const { data: toursIds } = await supabase.from('tours').select('id').order('id');
	const allTourIds = toursIds.map(tour => tour.id);

	const finalBookings = bookings.map(booking => {
		// Here relying on the order of tours, as they don't have and ID yet
		const tour = tours.at(booking.tourId - 1);
		const numDays = subtractDates(booking.endDate, booking.startDate);
		const tourPrice = numDays * (tour.price - tour.discount);
		const addedPrice = booking.hasFood ? numDays * 15 * booking.numTravellers : 0; // hardcoded breakfast price
		const totalPrice = tourPrice + addedPrice;

		let status;
		if (isPast(new Date(booking.endDate)) && !isToday(new Date(booking.endDate)))
			status = 'tour-ended';
		if (isFuture(new Date(booking.startDate)) || isToday(new Date(booking.startDate)))
			status = 'paid';
		if (
			(isFuture(new Date(booking.endDate)) || isToday(new Date(booking.endDate))) &&
			isPast(new Date(booking.startDate)) &&
			!isToday(new Date(booking.startDate))
		)
			status = 'tour-started';

		return {
			...booking,
			numDays,
			tourPrice,
			addedPrice,
			totalPrice,
			travellerId: allTravellerIds.at(booking.travellerId - 1),
			tourId: allTourIds.at(booking.tourId - 1),
			status,
		};
	});

	// console.log(finalBookings);

	const { error } = await supabase.from('bookings').insert(finalBookings);
	if (error) console.log(error.message);
	// else console.log('Bookings created successfully');
}

function Seed() {
	const [isLoading, setIsLoading] = useState(false);

	async function uploadAll() {
		setIsLoading(true);
		// Bookings need to be deleted FIRST
		await deleteBookings();
		await deleteTravellers();
		await deleteTours();

		// Bookings need to be created LAST
		await createTravellers();
		await createTours();
		await createBookings();

		setIsLoading(false);
	}

	async function uploadBookings() {
		setIsLoading(true);
		await deleteBookings();
		await createBookings();
		setIsLoading(false);
	}

	return (
		<div
			style={{
				marginTop: 'auto',
				backgroundColor: '#e0e7ff',
				padding: '8px',
				borderRadius: '5px',
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				gap: '8px',
			}}
		>
			<h3>SEED DATA</h3>

			<Button onClick={uploadAll} disabled={isLoading}>
				Upload ALL
			</Button>

			<Button onClick={uploadBookings} disabled={isLoading}>
				Upload bookings ONLY
			</Button>
		</div>
	);
}

export default Seed;
