import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import EditTourForm from './EditTourForm';
import { useDeleteTour } from './useDeleteTour';
import Modal from '../../ui/Modal';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

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
		<Table.Row>
			<Img src={image} alt={`${name} tour`} />
			<Tour>{name}</Tour>
			<div>Max {maxGroupSize} people on a tour</div>
			<Price>{formatCurrency(price)} </Price>
			{discount ? <Discount>{formatCurrency(discount)} </Discount> : <span>-</span>}

			<div>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={tourId} />

						<Menus.List id={tourId}>
							<Modal.Open opens="edit-tour">
								<Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
							</Modal.Open>

							<Modal.Open opens="delete-tour">
								<Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
							</Modal.Open>
						</Menus.List>

						<Modal.Window name="edit-tour">
							<EditTourForm tour={tour} />
						</Modal.Window>

						<Modal.Window name="delete-tour">
							<ConfirmDelete
								resourceName={tour.name}
								disabled={isDeleting}
								onConfirm={() => deleteTour(tourId)}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</div>
		</Table.Row>
	);
}
export default TourRow;
