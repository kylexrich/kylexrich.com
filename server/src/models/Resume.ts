import mongoose, { Document, Schema } from 'mongoose';

export interface ResumeDocument extends Document {
    name: string;
    file: Buffer;
    contentType: string;
    createdAt: Date;
    updatedAt: Date;
}

const ResumeSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        file: { type: Buffer, required: true },
        contentType: { type: String, required: true }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
);

const Resume = mongoose.model<ResumeDocument>('Resume', ResumeSchema);

export default Resume;
