import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useCreateTour } from './useCreateTour';
import FormRow from '../../ui/FormRow';

function CreateTourForm({ onCloseModal }) {
	const { register, handleSubmit, reset, getValues, formState } = useForm();
	const { errors: formErrors } = formState;

	const { isCreating, createTour } = useCreateTour();

	function onFormSubmit(data) {
		createTour(
			{ ...data, image: data.image[0] },
			{
				onSuccess: () => {
					reset();
					// call onCloseModal if the form is rendered inside a modal
					onCloseModal?.();
				},
			}
		);
	}

	return (
		<Form
			onSubmit={handleSubmit(onFormSubmit)}
			type={onCloseModal ? 'modal' : 'regular'}
		>
			<FormRow label="Tour name" error={formErrors?.name?.message}>
				<Input
					type="text"
					id="name"
					{...register('name', {
						required: 'Name is required',
					})}
				/>
			</FormRow>

			<FormRow label="Max Group size" error={formErrors?.maxGroupSize?.message}>
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
			</FormRow>

			<FormRow label="Regular price" error={formErrors?.price?.message}>
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
			</FormRow>

			<FormRow label="Discount" error={formErrors?.discount?.message}>
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
			</FormRow>

			<FormRow label="Tour description" error={formErrors?.description?.message}>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					{...register('description', {
						required: 'Description is required',
					})}
				/>
			</FormRow>

			<FormRow label="Tour photo">
				<FileInput
					id="image"
					accept="image/*"
					type="file"
					{...register('image', {
						required: 'Tour image is required',
					})}
				/>
			</FormRow>

			<FormRow>
				<Button
					variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				<Button disabled={isCreating}>Create tour</Button>
			</FormRow>
		</Form>
	);
}

export default CreateTourForm;
