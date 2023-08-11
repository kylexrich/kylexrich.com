import mongoose, { Schema, Document } from "mongoose";
export interface IResume extends Document {
  name: string;
  file: Buffer;
  contentType: string;
  createdAt: Date;
  updatedAt: Date;
}

const Resume: Schema = new Schema(
  {
    name: { type: String, required: true },
    file: { type: Buffer, required: true },
    contentType: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
);

const ResumeSchema = mongoose.model<IResume>("Resume", Resume);

export default ResumeSchema;
