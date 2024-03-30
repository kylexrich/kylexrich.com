import { checkPassword, createUser, findUserByEmail, findUserById } from './authRepository';

export async function registerUser(email: string, password: string) {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        return { status: 409, data: { error: 'User already exists' } };
    }

    const user = await createUser(email, password);
    return { status: 201, data: { user } };
}

export async function loginUser(email: string, password: string) {
    if (email !== 'kylexrich@gmail.com') {
        return { status: 400, data: { error: "You're not Kyle..." } };
    }

    const user = await findUserByEmail(email);
    if (!user) {
        return { status: 404, data: { error: 'Invalid email or password' } };
    }

    const isMatch = await checkPassword(password, user.password);
    if (!isMatch) {
        return { status: 404, data: { error: 'Invalid email or password' } };
    }

    return { status: 200, data: { user } };
}

export async function getUser(id: string) {
    if (!id) throw 'User not authenticated';
    const user = await findUserById(id);
    return { status: 200, data: { user } };
}

export async function logOutUser() {
    return { status: 200, data: { message: 'Successfully logged out' } };
}
