import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import EditTourForm from './EditTourForm';
import { useDeleteTour } from './useDeleteTour';
import Modal from '../../ui/Modal';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../ui/ConfirmDelete';

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
	const { isDeleting, deleteTour } = useDeleteTour();

	const { id: tourId, name, image, maxGroupSize, price, discount } = tour;

	return (
		<TableRow role="row">
			<Img src={image} alt={`${name} tour`} />
			<Tour>{name}</Tour>
			<div>Max {maxGroupSize} people on a tour</div>
			<Price>{formatCurrency(price)} </Price>
			{discount ? <Discount>{formatCurrency(discount)} </Discount> : <span>-</span>}

			<Modal>
				<Modal.Open opens="edit-tour">
					<button>
						<HiPencil />
					</button>
				</Modal.Open>
				<Modal.Window name="edit-tour">
					<EditTourForm tour={tour} />
				</Modal.Window>

				<Modal.Open opens="delete-tour">
					<button>
						<HiTrash />
					</button>
				</Modal.Open>
				<Modal.Window name="delete-tour">
					<ConfirmDelete
						resourceName={tour.name}
						disabled={isDeleting}
						onConfirm={() => deleteTour(tourId)}
					/>
				</Modal.Window>
			</Modal>
		</TableRow>
	);
}
export default TourRow;
