import { Response } from 'express';
import { uploadResume, getRecentResume } from './resumeService';
import { log } from '../../config/log4jsConfig';
import { AuthenticatedRequest } from '../../interfaces/AuthenticatedRequest';

export async function addResume(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        if (!req.files || !req.files.resume) {
            res.status(400).send({ error: 'No file uploaded' });
            return;
        }

        const resumeFile = req.files.resume as { data: Buffer; mimetype: string };
        const result = await uploadResume(req.body.name, resumeFile.data, resumeFile.mimetype);

        res.set('Content-Type', resumeFile.mimetype);
        res.status(result.status).send(result.data);
    } catch (error) {
        log.error(error);
        res.status(500).send({ error: 'Error uploading resume' });
    }
}

export async function getLatestResume(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        const result = await getRecentResume();
        if (result.status === 404) {
            res.status(404).send(result.data);
            return;
        }

        res.set('Content-Type', result.contentType);
        res.send(result.file);
    } catch (error) {
        log.error(error);
        res.status(500).send({ error: 'Error retrieving resume' });
    }
}
