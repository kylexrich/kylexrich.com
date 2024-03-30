import * as resumeRepository from './resumeRepository';

export async function uploadResume(name: string, fileData: Buffer, mimeType: string) {
    const savedResume = await resumeRepository.saveResume(name, fileData, mimeType);
    return { status: 201, data: savedResume.file, contentType: savedResume.contentType };
}

export async function getRecentResume() {
    const resume = await resumeRepository.getLatestResume();
    if (!resume) {
        return { status: 404, data: { error: 'Resume not found' } };
    }

    return { status: 200, file: resume.file, contentType: resume.contentType };
}
