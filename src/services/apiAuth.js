import supabase from './supabase';

export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({ email, password });
	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	return data;
}

// get user data from supabase on each login
// this ensures that the updated user gets fetched everytime
export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();
	if (!session.session) return null;

	const { data, error } = await supabase.auth.getUser();
	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	return data?.user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}
