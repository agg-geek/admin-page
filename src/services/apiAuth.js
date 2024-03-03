import supabase, { supabaseUrl } from './supabase';

export async function signup({ fullName, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: { data: { fullName, avatar: '' } },
	});

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	return data;
}

export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({ email, password });
	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	return data;
}

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

export async function updateCurrentUser({ fullName, avatar, password }) {
	const updateData = {
		...(fullName && { data: { fullName } }),
		...(password && { password }),
	};

	const { data, error } = await supabase.auth.updateUser(updateData);

	if (error) {
		console.log(error);
		throw new Error(error.message);
	}

	if (!avatar) return data;

	const fileName = `avatar-${data.user.id}-${Date.now()}`;

	const { error: storageError } = await supabase.storage
		.from('avatars')
		.upload(fileName, avatar);

	if (storageError) {
		console.log('Could not store the user avatar image');
		throw new Error(storageError.message);
	}

	const { data: updatedUser, error: errorUserAvatar } = await supabase.auth.updateUser({
		data: {
			avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
		},
	});

	if (errorUserAvatar) {
		console.log('Could not update the user avatar path');
		throw new Error(errorUserAvatar.message);
	}
	return updatedUser;
}
