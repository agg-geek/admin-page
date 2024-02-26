import { supabaseUrl } from '../services/supabase';

const imageUrl = `${supabaseUrl}/storage/v1/object/public/tour-images/`;

export const tours = [
	{
		name: 'Tour 001',
		maxGroupSize: 2,
		price: 250,
		discount: 0,
		image: imageUrl + 'tour-01.jpg',
		description:
			"Experience the rich cultural tapestry of Asia on our 'Eastern Rhythms' tour. From bustling metropolises like Tokyo and Seoul to tranquil temples in Kyoto and Taipei, immerse yourself in diverse musical traditions and vibrant local scenes.",
	},
	{
		name: 'Tour 002',
		maxGroupSize: 2,
		price: 350,
		discount: 25,
		image: imageUrl + 'tour-02.jpg',
		description:
			"Join us for the ultimate outdoor adventure with our 'Wilderness Serenade' tour. Trek through stunning national parks, camp under the stars, and unwind with acoustic concerts amidst breathtaking natural landscapes.",
	},
	{
		name: 'Tour 003',
		maxGroupSize: 4,
		price: 300,
		discount: 0,
		image: imageUrl + 'tour-03.jpg',
		description:
			"Embark on a musical journey through the heart of Europe with our 'European Melodies' tour. Explore iconic cities like Paris, Vienna, and Prague while enjoying live performances in historic venues and intimate jazz clubs.",
	},
	{
		name: 'Tour 004',
		maxGroupSize: 4,
		price: 500,
		discount: 50,
		image: imageUrl + 'tour-04.jpg',
		description:
			"Saddle up for an unforgettable journey on our 'Country Roads & Honky-Tonk Days' tour. Discover the roots of American music as we traverse iconic Route 66, stopping at legendary venues and dive bars for toe-tapping performances.",
	},
	{
		name: 'Tour 005',
		maxGroupSize: 6,
		price: 350,
		discount: 0,
		image: imageUrl + 'tour-05.jpg',
		description:
			"Indulge your senses on our 'Gastronomic Grooves' tour, where music meets culinary delights. From wine tastings in Tuscany to street food tours in Bangkok, savor the sounds and flavors of global cuisine in unforgettable settings.",
	},
	{
		name: 'Tour 006',
		maxGroupSize: 6,
		price: 800,
		discount: 100,
		image: imageUrl + 'tour-06.jpg',
		description:
			"Unleash your inner rock star on our 'Legends of Rock' tour. Pay homage to music icons with visits to their hometowns, exclusive behind-the-scenes access to recording studios, and epic live concerts in iconic arenas.",
	},
	{
		name: 'Tour 007',
		maxGroupSize: 8,
		price: 600,
		discount: 100,
		image: imageUrl + 'tour-07.jpg',
		description:
			"Join us for a soul-stirring journey through the heart of Africa on our 'Rhythms of the Sahara' tour. From vibrant marketplaces in Marrakech to rhythmic drum circles in the Sahara desert, experience the magic of African music and culture.",
	},
	{
		name: 'Tour 008',
		maxGroupSize: 10,
		price: 1400,
		discount: 0,
		image: imageUrl + 'tour-08.jpg',
		description:
			"Step back in time with our 'Vintage Vinyl' tour, celebrating the golden age of music. Explore retro record shops, attend vinyl listening parties, and groove to live performances of classic hits from the '60s and '70s.",
	},
];
