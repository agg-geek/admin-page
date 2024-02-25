import styled from 'styled-components';
import Button from './Button';
import Heading from './Heading';

const StyledConfirmDelete = styled.div`
	width: 40rem;
	display: flex;
	flex-direction: column;
	gap: 1.2rem;

	& p {
		color: var(--color-grey-500);
		margin-bottom: 1.2rem;
	}

	& div {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
	// this delete tour modal window will automatically close after deleting tour
	// unlike create or edit tour modals, for which onSuccess: onCloseModal is to be specified
	// this delete modal closes because the tour row itself gets deleted,
	// so this modal window inside also gets deleted
	return (
		<StyledConfirmDelete>
			<Heading as="h3">Delete {resourceName}?</Heading>
			<p>
				Are you sure you want to delete {resourceName} permanently? This action
				cannot be undone.
			</p>

			<div>
				<Button variation="secondary" disabled={disabled} onClick={onCloseModal}>
					Cancel
				</Button>
				<Button variation="danger" disabled={disabled} onClick={onConfirm}>
					Delete
				</Button>
			</div>
		</StyledConfirmDelete>
	);
}

export default ConfirmDelete;
