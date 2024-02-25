import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTour } from '../../services/apiTours';
import toast from 'react-hot-toast';

const FormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

function CreateTourForm() {
	// notice there are no controlled elements
	// the form is handled using react-hook-form
	const { register, handleSubmit, reset } = useForm();

	const queryClient = useQueryClient();

	const { mutate, isLoading: isCreating } = useMutation({
		// mutationFn: (tour) => createTour(tour),
		mutationFn: createTour,
		onSuccess: () => {
			toast.success('Cabin created successfully');
			queryClient.invalidateQueries({
				queryKey: ['tours'],
			});

			// reset the form after tour was created
			// we should also close the form here, to be done later
			reset();
		},
		onError: err => {
			console.log(err);
			toast.error(err.message);
		},
	});

	function onFormSubmit(data) {
		// data will be the form data with which the form is submitted
		// console.log(data);
		mutate(data);
	}

	return (
		<Form onSubmit={handleSubmit(onFormSubmit)}>
			<FormRow>
				<Label htmlFor="name">Tour name</Label>
				<Input type="text" id="name" {...register('name')} />
			</FormRow>

			<FormRow>
				<Label htmlFor="maxGroupSize">Max Group size</Label>
				<Input type="number" id="maxGroupSize" {...register('maxGroupSize')} />
			</FormRow>

			<FormRow>
				<Label htmlFor="price">Regular price</Label>
				<Input type="number" id="price" {...register('price')} />
			</FormRow>

			<FormRow>
				<Label htmlFor="discount">Discount</Label>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					{...register('discount')}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor="description">Description for website</Label>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					{...register('description')}
				/>
			</FormRow>

			<FormRow>
				<Label htmlFor="image">Tour photo</Label>
				<FileInput id="image" accept="image/*" />
			</FormRow>

			<FormRow>
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isCreating}>Create tour</Button>
			</FormRow>
		</Form>
	);
}

export default CreateTourForm;
