import Resume, {ResumeDocument} from '../../models/Resume.js';
import {s3} from '../../config/connectToS3.js';
import {ContentType} from '../../util/types/ContentType.js';


export class ResumeRepository {
    public async uploadResume(file: Express.Multer.File): Promise<ResumeDocument> {
        const resumeName = `kyle-rich-resume-${new Date().toISOString().substring(0, 10)}`;

        const data = await s3.upload({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: `resumes/${resumeName}`,
            Body: file.buffer,
            ContentType: ContentType.PDF,
            ACL: 'public-read'
        }).promise();

        const newResume: ResumeDocument = new Resume({
            name: resumeName,
            s3Url: data.Location
        });

        return await newResume.save();
    }

    public async getLatestResume(): Promise<ResumeDocument | null> {
        return Resume.findOne().sort({createdAt: -1});
    }
}
