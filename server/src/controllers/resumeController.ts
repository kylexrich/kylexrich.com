import { Request, Response } from "express";
import ResumeSchema, { IResume } from "../models/resume";

export const addResume = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files || !req.files.resume) {
      res.status(400).send("No file uploaded");
      return;
    }

    const resumeFile = req.files.resume as { data: Buffer; mimetype: string };

    const newResume: IResume = new ResumeSchema({
      name: req.body.name || "Unnamed Resume",
      file: resumeFile.data,
      contentType: resumeFile.mimetype,
    });

    await newResume.save();

    res.status(201).send({ message: "Resume uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading resumeBlobUrl");
  }
};

export const getMostRecentResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const resume = await ResumeSchema.findOne().sort({ createdAt: -1 });

    if (!resume) {
      res.status(404).send("Resume not found");
      return;
    }

    res.set("Content-Type", resume.contentType);
    res.send(resume.file);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving resumeBlobUrl");
  }
};

export const getResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const resume = await ResumeSchema.findById(req.params.id);

    if (!resume) {
      res.status(404).send("Resume not found");
      return;
    }

    res.set("Content-Type", resume.contentType);
    res.send(resume.file);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving resumeBlobUrl");
  }
};
