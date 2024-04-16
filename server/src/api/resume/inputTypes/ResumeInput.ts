import {IsNotEmpty} from "class-validator";

export class ResumeInput {
    @IsNotEmpty({message: "Resume file is required"})
    readonly resume: {data: Buffer, mimetype: string};

    constructor(resume: {data: Buffer, mimetype: string}) {
        this.resume = resume;
    }
}
