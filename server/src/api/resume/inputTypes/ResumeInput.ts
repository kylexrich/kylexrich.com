import {IsNotEmpty} from "class-validator";

export class ResumeInput {
    @IsNotEmpty({message: "Resume file is required"})
    readonly file: Express.Multer.File;

    constructor(file: Express.Multer.File) {
        this.file = file;
    }
}
