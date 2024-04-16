import { IsEmail, IsString } from 'class-validator';

export class UserInfoInput {
    @IsEmail({}, { message: "Invalid email format" })
    readonly email: string;

    @IsString({ message: "Password must be a string" })
    readonly password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
