import Resume, { IResume } from '../../models/Resume';

export async function saveResume(name: string, fileData: Buffer, mimeType: string): Promise<IResume> {
    const resumeName = name || new Date().toISOString().substring(0, 10);
    const newResume: IResume = new Resume({
        name: resumeName,
        file: fileData,
        contentType: mimeType
    });
    return await newResume.save();
}

export async function getLatestResume(): Promise<IResume | null> {
    return Resume.findOne().sort({ createdAt: -1 });
}
