import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useEditTour } from './useEditTour';

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

function EditTourForm({ tour }) {
	const { register, handleSubmit, getValues, formState } = useForm({
		defaultValues: tour,
	});
	const { errors: formErrors } = formState;

	const { isEditing, editTour } = useEditTour();

	function onFormSubmit(data) {
		const image = typeof data.image === 'string' ? data.image : data.image[0];
		editTour({ tourId: tour.id, tour: { ...data, image } });
	}

	return (
		<Form onSubmit={handleSubmit(onFormSubmit)}>
			<FormRow>
				<Label htmlFor="name">Tour name</Label>
				<Input
					type="text"
					id="name"
					{...register('name', {
						required: 'Name is required',
					})}
				/>
				{formErrors?.name?.message && <Error>{formErrors?.name?.message}</Error>}
			</FormRow>

			<FormRow>
				<Label htmlFor="maxGroupSize">Max Group size</Label>
				<Input
					type="number"
					id="maxGroupSize"
					{...register('maxGroupSize', {
						required: 'Group size is required',
						min: {
							value: 1,
							message: 'Group size should be atleast 1',
						},
					})}
				/>
				{formErrors?.maxGroupSize?.message && (
					<Error>{formErrors?.maxGroupSize?.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="price">Regular price</Label>
				<Input
					type="number"
					id="price"
					{...register('price', {
						required: 'Price is required',
						min: {
							value: 1,
							message: 'Prize should be greater than 0',
						},
					})}
				/>
				{formErrors?.price?.message && (
					<Error>{formErrors?.price?.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="discount">Discount</Label>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					{...register('discount', {
						required: 'Discount is required',
						min: {
							value: 0,
							message: 'Discount should be >= 0',
						},
						validate: disc =>
							+disc < +getValues().price ||
							'Discount should be less than regular price',
					})}
				/>
				{formErrors?.discount?.message && (
					<Error>{formErrors?.discount?.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="description">Tour description</Label>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					{...register('description', {
						required: 'Description is required',
					})}
				/>
				{formErrors?.description?.message && (
					<Error>{formErrors?.description?.message}</Error>
				)}
			</FormRow>

			<FormRow>
				<Label htmlFor="image">Tour photo</Label>
				<FileInput
					id="image"
					accept="image/*"
					type="file"
					{...register('image')}
				/>
			</FormRow>

			<FormRow>
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isEditing}>Save tour</Button>
			</FormRow>
		</Form>
	);
}

export default EditTourForm;
