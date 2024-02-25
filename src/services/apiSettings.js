import supabase from './supabase';

export async function getSettings() {
	// we apply .single() as there is only 1 row,
	// so take the single value from the selected array
	const { data, error } = await supabase.from('settings').select('*').single();

	if (error) {
		console.error(error);
		throw new Error('Settings could not be loaded');
	}
	return data;
}

// newSetting object looks like {setting_col: newValue}
export async function updateSetting(newSetting) {
	const { data, error } = await supabase
		.from('settings')
		.update(newSetting)
		// There is only one row of settings with id=1, and this is the only one updated
		.eq('id', 1)
		.single();

	if (error) {
		console.error(error);
		throw new Error('Settings could not be updated');
	}
	return data;
}
