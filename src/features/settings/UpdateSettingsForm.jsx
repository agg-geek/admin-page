import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

function UpdateSettingsForm() {
	return (
		<Form>
			<FormRow label="Minimum days/booking">
				<Input type="number" id="min-days" />
			</FormRow>
			<FormRow label="Maximum days/booking">
				<Input type="number" id="max-days" />
			</FormRow>
			<FormRow label="Maximum travellers/booking">
				<Input type="number" id="max-travellers" />
			</FormRow>
			<FormRow label="Breakfast price">
				<Input type="number" id="breakfast-price" />
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
