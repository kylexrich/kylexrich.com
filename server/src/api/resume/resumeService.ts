import * as resumeRepository from './resumeRepository';
import { ServiceResponse } from '../../types/ServiceResponse';
import { NotFoundError } from '../../errors/NotFoundError';

export async function uploadResume(
    name: string,
    fileData: Buffer,
    mimeType: string
): Promise<Required<ServiceResponse>> {
    const savedResume = await resumeRepository.saveResume(name, fileData, mimeType);
    return { data: savedResume.file, contentType: savedResume.contentType };
}

export async function getRecentResume(): Promise<ServiceResponse> {
    const resume = await resumeRepository.getLatestResume();
    if (!resume) {
        throw new NotFoundError('Resume not found');
    }

    return { data: resume.file, contentType: resume.contentType };
}
