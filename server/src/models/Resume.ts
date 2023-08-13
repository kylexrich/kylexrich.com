import mongoose, { Schema, Document } from "mongoose";
export interface IResume extends Document {
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
    contentType: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
);

const Resume = mongoose.model<IResume>("Resume", ResumeSchema);

export default Resume;
