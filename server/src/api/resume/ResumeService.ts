import { ServiceResponse } from "../../util/types/ServiceResponse.js";
import {ContentType} from "../../util/types/ContentType.js";
import {ResumeRepository} from "./ResumeRepository.js";
import {ResumeDocument} from "../../models/Resume.js";
import {NotFoundError} from "../../errors/NotFoundError.js";


export type ResumeData = Buffer;

export class ResumeService {
    private readonly resumeRepo: ResumeRepository;

    constructor(resumeRepo: ResumeRepository) {
        this.resumeRepo = resumeRepo;
    }

    public async uploadResume(name: string, fileData: Buffer, mimeType: string): Promise<ServiceResponse<ResumeData>> {
        const savedResume: ResumeDocument = await this.resumeRepo.uploadResume(name, fileData, mimeType);
        return { data: savedResume.file, contentType: ContentType.PDF };
    }

    public async getLatestResume(): Promise<ServiceResponse<ResumeData>> {
        const resume: ResumeDocument | null = await this.resumeRepo.getLatestResume();

        if (!resume) {
            throw new NotFoundError('Resume not found');
        }

        return { data: resume.file, contentType: ContentType.PDF };
    }
}
