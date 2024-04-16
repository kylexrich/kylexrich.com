import {UserDocument} from '../../models/User.js';
import {AuthRepository} from './AuthRepository.js';
import {ServiceResponse} from '../../util/types/ServiceResponse.js';
import {UserExistsError} from '../../errors/UserExistsError.js';
import {ContentType} from '../../util/types/ContentType.js';
import {AuthenticationError} from '../../errors/AuthenticationError.js';


export type UserData = Omit<UserDocument, 'password'>;

export interface LogoutMessage {
    message: string;
}

export class AuthService {
    private readonly authRepo: AuthRepository;

    constructor(authRepo: AuthRepository) {
        this.authRepo = authRepo;
    }

    public async registerUser(providedEmail: string, providedPassword: string): Promise<ServiceResponse<UserData>> {
        const existingUser: UserDocument | null = await this.authRepo.findUserByEmail(providedEmail);

        if (existingUser) {
            throw new UserExistsError('User already exists');
        }

        const userDocument: UserDocument = await this.authRepo.createUser(providedEmail, providedPassword);
        const user: UserData & { password?: string } = userDocument.toObject();
        delete user.password;

        return {data: user, contentType: ContentType.JSON};
    }

    public async loginUser(providedEmail: string, providedPassword: string): Promise<ServiceResponse<UserData>> {
        const userDocument: UserDocument | null = await this.authRepo.findUserByEmail(providedEmail);

        if (!userDocument || !(await this.authRepo.checkPassword(providedPassword, userDocument.password))) {
            throw new AuthenticationError('Invalid email or password');
        }

        const user: UserData & { password?: string } = userDocument.toObject();
        delete user.password;

        return {data: user, contentType: ContentType.JSON};
    }

    public async getUser(id: string): Promise<ServiceResponse<UserData>> {
        const userDocument: UserDocument | null = await this.authRepo.findUserById(id);

        if (!userDocument) {
            throw new AuthenticationError('User not found');
        }

        const user: UserData & { password?: string } = userDocument.toObject();
        delete user.password;

        return {data: user, contentType: ContentType.JSON};
    }

    public logoutUser(): ServiceResponse<LogoutMessage> {
        return {data: {message: 'Successfully logged out'}, contentType: ContentType.JSON};
    }
}
