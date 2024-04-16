import Resume, {ResumeDocument} from "../../models/Resume.js";
import {ContentType} from "../../util/types/ContentType.js";


export class ResumeRepository {
    public async uploadResume(fileData: Buffer): Promise<ResumeDocument> {
        const resumeName = "resume-" + new Date().toISOString().substring(0, 10);
        const newResume: ResumeDocument = new Resume({
            name: resumeName,
            file: fileData,
            contentType: ContentType.PDF
        });
        return await newResume.save();
    }

    public async getLatestResume(): Promise<ResumeDocument | null> {
        return Resume.findOne().sort({ createdAt: -1 });
    }
}
