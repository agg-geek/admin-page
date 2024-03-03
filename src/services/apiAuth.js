import supabase from './supabase';

export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({ email, password });
	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	// supbase sends data containing data.session which is jwt
	// and data.user which has data.user.role of 'authenticated'
	// supabase will store the data in local storage
	return data;
}
