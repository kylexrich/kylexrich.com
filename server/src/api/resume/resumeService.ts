import * as resumeRepository from './resumeRepository';
import { ServiceResponse } from '../../types/ServiceResponse';
import { NotFoundError } from '../../errors/NotFoundError';
import { ResumeDocument } from '../../models/Resume';

export type ResumeData = Buffer;

export async function uploadResume(name: string, fileData: Buffer, mimeType: string): Promise<ServiceResponse<ResumeData>> {
    const savedResume: ResumeDocument = await resumeRepository.saveResume(name, fileData, mimeType);
    return { data: savedResume.file, contentType: savedResume.contentType };
}

export async function getRecentResume(): Promise<ServiceResponse<ResumeData>> {
    const resume: ResumeDocument | null = await resumeRepository.getLatestResume();

    if (!resume) {
        throw new NotFoundError('Resume not found');
    }

    return { data: resume.file, contentType: resume.contentType };
}
