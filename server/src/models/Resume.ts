import mongoose, {Document, Model, Schema} from 'mongoose';

export interface ResumeDocument extends Document {
    name: string;
    s3Url: string;
    createdAt: Date;
    updatedAt: Date;
}

const ResumeSchema: Schema = new Schema(
    {
        name: {type: String, required: true},
        s3Url: {type: String, required: true}
    },
    {
        timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}
    }
);

const Resume: Model<ResumeDocument> = mongoose.model<ResumeDocument>('Resume', ResumeSchema);

export default Resume;
