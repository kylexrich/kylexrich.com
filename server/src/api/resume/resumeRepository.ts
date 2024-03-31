import Resume, { ResumeDocument } from '../../models/Resume';

export async function saveResume(name: string, fileData: Buffer, mimeType: string): Promise<ResumeDocument> {
    const resumeName = name || new Date().toISOString().substring(0, 10);
    const newResume: ResumeDocument = new Resume({
        name: resumeName,
        file: fileData,
        contentType: mimeType
    });
    return await newResume.save();
}

export async function getLatestResume(): Promise<ResumeDocument | null> {
    return Resume.findOne().sort({ createdAt: -1 });
}
