import { checkPassword, createUser, findUserByEmail, findUserById } from './authRepository';
import { ServiceResponse } from '../../types/ServiceResponse';
import { UserExistsError } from '../../errors/UserExistsError';
import { AuthenticationError } from '../../errors/AuthenticationError';
import { ContentType } from '../../types/ContentType';
import { UserDocument } from '../../models/User';

export type UserData = Omit<UserDocument, 'password'>;

export async function registerUser(providedEmail: string, providedPassword: string): Promise<ServiceResponse<UserData>> {
    const existingUser: UserDocument | null = await findUserByEmail(providedEmail);

    if (existingUser) {
        throw new UserExistsError('User already exists');
    }

    const userDocument: UserDocument = await createUser(providedEmail, providedPassword);
    const user = userDocument.toObject();
    delete user.password;

    return { data: user, contentType: ContentType.JSON };
}

export async function loginUser(providedEmail: string, providedPassword: string): Promise<ServiceResponse<UserData>> {
    const userDocument: UserDocument | null = await findUserByEmail(providedEmail);

    if (!userDocument || !(await checkPassword(providedPassword, userDocument.password))) {
        throw new AuthenticationError('Invalid email or password');
    }

    const user = userDocument.toObject();
    delete user.password;

    return { data: user, contentType: ContentType.JSON };
}

export async function getUser(id: string): Promise<ServiceResponse<UserData>> {
    const userDocument: UserDocument | null = await findUserById(id);

    if (!userDocument) {
        throw new AuthenticationError('User not found');
    }

    const user = userDocument.toObject();
    delete user.password;

    return { data: user, contentType: ContentType.JSON };
}

export interface LogoutMessage {
    message: string;
}

export async function logOutUser(): Promise<ServiceResponse<LogoutMessage>> {
    return { data: { message: 'Successfully logged out' }, contentType: ContentType.JSON };
}
