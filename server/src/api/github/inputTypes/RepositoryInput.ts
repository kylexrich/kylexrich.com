import {IsString} from "class-validator";

export class RepositoryInput {
    @IsString({message: "Repository must be a string"})
    readonly repository: string;

    constructor(repository: string) {
        this.repository = repository;
    }
}
