import {ResumeRepository} from './ResumeRepository.js';
import {ServiceResponse} from '../../util/types/ServiceResponse.js';
import {ResumeDocument} from '../../models/Resume.js';
import {ContentType} from '../../util/types/ContentType.js';
import {NotFoundError} from '../../errors/NotFoundError.js';
import {ResumeInput} from "./inputTypes/ResumeInput.js";

export interface ResumeData { s3Url: string }

export class ResumeService {
    private readonly resumeRepo: ResumeRepository;

    constructor(resumeRepo: ResumeRepository) {
        this.resumeRepo = resumeRepo;
    }

    public async uploadResume(file: ResumeInput): Promise<ServiceResponse<ResumeData>> {
        const savedResume: ResumeDocument = await this.resumeRepo.uploadResume(file.file);
        return {data: {s3Url: savedResume.s3Url}, contentType: ContentType.JSON};
    }

    public async getLatestResume(): Promise<ServiceResponse<ResumeData>> {
        const resume: ResumeDocument | null = await this.resumeRepo.getLatestResume();

        if (!resume) {
            throw new NotFoundError('Resume not found');
        }

        return {data: {s3Url: resume.s3Url}, contentType: ContentType.JSON};
    }
}
