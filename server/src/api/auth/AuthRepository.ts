import bcrypt from 'bcrypt';
import User, { UserDocument } from '../../models/User';

export class AuthRepository {
    public async findUserById(id: string): Promise<UserDocument | null> {
        return User.findById(id);
    }

    public async findUserByEmail(email: string): Promise<UserDocument | null> {
        return User.findOne({ email });
    }

    public async createUser(email: string, password: string): Promise<UserDocument> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        return newUser.save();
    }

    public async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}
