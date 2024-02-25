import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { formatCurrency } from '../../utils/helpers';
import { deleteTour } from '../../services/apiTours';
import EditTourForm from './EditTourForm';

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Tour = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;

function TourRow({ tour }) {
	const [showEditForm, setShowEditForm] = useState(false);

	const { id: tourId, name, image, maxGroupSize, price, discount } = tour;

	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate } = useMutation({
		mutationFn: id => deleteTour(id),
		// after the mutation has been performed, the tour will be deleted
		// but the frontend won't update, hence you need to invalidate the tours cache
		onSuccess: () => {
			toast.success('Cabin was deleted successfully');
			// the invalidateQueries is present on the queryClient from which we use react query
			queryClient.invalidateQueries({
				queryKey: ['tours'],
			});
		},
		onError: err => {
			console.log(err);
			toast.error(err.message);
		},
	});

	return (
		<>
			<TableRow role="row">
				<Img src={image} alt={`${name} tour`} />
				<Tour>{name}</Tour>
				<div>Max {maxGroupSize} people on a tour</div>
				<Price>{formatCurrency(price)} </Price>
				<Price>{formatCurrency(discount)} </Price>
				<button onClick={() => setShowEditForm(s => !s)}>Edit</button>
				<button onClick={() => mutate(tourId)} disabled={isDeleting}>
					Delete
				</button>
			</TableRow>
			{showEditForm && <EditTourForm tour={tour} />}
		</>
	);
}
export default TourRow;
