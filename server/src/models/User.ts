import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
);

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
