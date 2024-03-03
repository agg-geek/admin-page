import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSettings';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
	const { isLoading, settings } = useSettings();

	const { minBookingLength, maxBookingLength, maxTravellersPerBooking, foodPrice } =
		settings ?? {};

	const { isUpdating, updateSetting } = useUpdateSetting();

	function handleUpdate(evt) {
		const { value, name: setting } = evt.target;
		if (!value) return;
		updateSetting({ [setting]: value });
	}

	if (isLoading) return <Spinner />;

	return (
		<Form>
			<FormRow label="Minimum days/booking">
				<Input
					type="number"
					id="min-days"
					name="minBookingLength"
					defaultValue={minBookingLength}
					onBlur={handleUpdate}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Maximum days/booking">
				<Input
					type="number"
					id="max-days"
					name="maxBookingLength"
					defaultValue={maxBookingLength}
					onBlur={handleUpdate}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Maximum travellers/booking">
				<Input
					type="number"
					id="max-travellers"
					name="maxTravellersPerBooking"
					defaultValue={maxTravellersPerBooking}
					onBlur={handleUpdate}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Food price">
				<Input
					type="number"
					id="food-price"
					name="foodPrice"
					defaultValue={foodPrice}
					onBlur={handleUpdate}
					disabled={isUpdating}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
