import {Request, Response} from 'express';
import {ResponseHandler} from "../../util/helper/ResponseHandler.js";
import {ResumeData, ResumeService} from "./ResumeService.js";
import {BadRequestError} from "../../errors/BadRequestError.js";
import {ServiceResponse} from "../../util/types/ServiceResponse.js";
import {NotFoundError} from "../../errors/NotFoundError.js";
import {isAuthenticatedRequest} from "../../util/types/AuthenticatedRequest.js";
import {ValidationError} from "class-validator/types/validation/ValidationError.js";
import {validateSync} from "class-validator";
import {ResumeInput} from "./inputTypes/ResumeInput.js";

export class ResumeController {
    private readonly resumeService: ResumeService;
    private readonly responseHandler: ResponseHandler;

    constructor(resumeService: ResumeService, responseHandler: ResponseHandler) {
        this.resumeService = resumeService;
        this.responseHandler = responseHandler;
    }

    public async uploadResume(req: Request, res: Response): Promise<void> {
        try {
            if (!isAuthenticatedRequest(req)) {
                this.responseHandler.sendNotAuthenticatedResponse(res);
                return;
            }

            const input: ResumeInput = new ResumeInput(req.file!);
            const validationErrors: ValidationError[] = validateSync(input);

            if (validationErrors.length > 0) {
                this.responseHandler.sendInputValidationErrorResponse(res, validationErrors);
                return;
            }

            const result: ServiceResponse<ResumeData> = await this.resumeService.uploadResume(input);

            this.responseHandler.sendSuccessResponse(res, 201, result);
        } catch (error) {
            if (error instanceof BadRequestError) {
                this.responseHandler.sendErrorResponse(res, 400, error.message, error);
            } else {
                this.responseHandler.sendErrorResponse(res, 500, 'Error uploading resume', error);
            }
        }
    }

    public async getLatestResume(req: Request, res: Response): Promise<void> {
        try {
            if (!isAuthenticatedRequest(req)) {
                this.responseHandler.sendNotAuthenticatedResponse(res);
                return;
            }
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
