import { Response } from 'express';
import { getRecentResume, uploadResume } from './resumeService';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest';
import { BadRequestError } from '../../errors/BadRequestError';
import { NotFoundError } from '../../errors/NotFoundError';
import { ServiceResponse } from '../../types/ServiceResponse';
import { sendErrorResponse, sendSuccessResponse } from '../../util/responseHelpers';

export async function addResume(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        if (!req.files || !req.files.resume) {
            throw new BadRequestError('No file uploaded');
        }

        const resumeFile = req.files.resume as { data: Buffer; mimetype: string };
        const result: ServiceResponse = await uploadResume(req.body.name, resumeFile.data, resumeFile.mimetype);

        sendSuccessResponse(res, 201, result);
    } catch (error) {
        if (error instanceof BadRequestError) {
            sendErrorResponse(res, 400, error.message, error);
        } else {
            sendErrorResponse(res, 500, 'Error uploading resume', error);
        }
    }
}

export async function getLatestResume(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        const result: ServiceResponse = await getRecentResume();

        sendSuccessResponse(res, 200, result);
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(res, 404, error.message, error);
        } else {
            sendErrorResponse(res, 500, 'Error retrieving resume', error);
        }
    }
}
