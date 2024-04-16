import Resume, {ResumeDocument} from "../../models/Resume.js";


export class ResumeRepository {
    public async uploadResume(name: string, fileData: Buffer, mimeType: string): Promise<ResumeDocument> {
        const resumeName = name || new Date().toISOString().substring(0, 10);
        const newResume: ResumeDocument = new Resume({
            name: resumeName,
            file: fileData,
            contentType: mimeType
        });
        return await newResume.save();
    }

    public async getLatestResume(): Promise<ResumeDocument | null> {
        return Resume.findOne().sort({ createdAt: -1 });
    }
}
