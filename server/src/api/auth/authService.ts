import { checkPassword, createUser, findUserByEmail, findUserById } from './authRepository';
import { ServiceResponse } from '../../types/ServiceResponse';
import { UserExistsError } from '../../errors/UserExistsError';
import { AuthenticationError } from '../../errors/AuthenticationError';
import { ContentType } from '../../types/ContentType';

export async function registerUser(email: string, password: string): Promise<ServiceResponse> {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        throw new UserExistsError('User already exists');
    }
    const user = await createUser(email, password);
    return { data: { user }, contentType: ContentType.JSON };
}

export async function loginUser(email: string, password: string): Promise<ServiceResponse> {
    const user = await findUserByEmail(email);
    if (!user || !(await checkPassword(password, user.password))) {
        throw new AuthenticationError('Invalid email or password');
    }
    return { data: { user }, contentType: ContentType.JSON };
}

export async function getUser(id: string): Promise<ServiceResponse> {
    const user = await findUserById(id);
    if (!user) {
        throw new AuthenticationError('User not found');
    }
    return { data: { user }, contentType: ContentType.JSON };
}

export async function logOutUser(): Promise<ServiceResponse> {
    return { data: { message: 'Successfully logged out' }, contentType: ContentType.JSON };
}
