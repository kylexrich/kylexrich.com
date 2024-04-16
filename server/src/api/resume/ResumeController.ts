import { Response } from 'express';
import {ResponseHandler} from "../../util/helper/ResponseHandler.js";
import {ResumeData, ResumeService} from "./ResumeService.js";
import {AuthenticatedRequest} from "../../util/types/AuthenticatedRequest.js";
import {BadRequestError} from "../../errors/BadRequestError.js";
import {ServiceResponse} from "../../util/types/ServiceResponse.js";
import {NotFoundError} from "../../errors/NotFoundError.js";

export class ResumeController {
    private readonly resumeService: ResumeService;
    private readonly responseHandler: ResponseHandler;

    constructor(resumeService: ResumeService, responseHandler: ResponseHandler) {
        this.resumeService = resumeService;
        this.responseHandler = responseHandler;
    }

    public async uploadResume(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            if (req.files && 'resume' in req.files && !req.files?.resume) {
                throw new BadRequestError('No file uploaded');
            }

            // @ts-expect-error temporary until next commit
            const resumeFile = req.files.resume as { data: Buffer; mimetype: string };
            const result: ServiceResponse<ResumeData> = await this.resumeService.uploadResume(
                req.body.name,
                resumeFile.data,
                resumeFile.mimetype
            );

            this.responseHandler.sendSuccessResponse(res, 201, result);
        } catch (error) {
            if (error instanceof BadRequestError) {
                this.responseHandler.sendErrorResponse(res, 400, error.message, error);
            } else {
                this.responseHandler.sendErrorResponse(res, 500, 'Error uploading resume', error);
            }
        }
    }

    public async getLatestResume(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const result: ServiceResponse<ResumeData> = await this.resumeService.getLatestResume();

            this.responseHandler.sendSuccessResponse(res, 200, result);
        } catch (error) {
            if (error instanceof NotFoundError) {
                this.responseHandler.sendErrorResponse(res, 404, error.message, error);
            } else {
                this.responseHandler.sendErrorResponse(res, 500, 'Error retrieving resume', error);
            }
        }
    }
}
