import {Response} from 'express';
import {ContentType} from '../types/ContentType.js';
import {log} from '../../config/log4jsConfig.js';
import {ServiceResponse} from '../types/ServiceResponse.js';
import {ValidationError} from "class-validator/types/validation/ValidationError.js";

export class ResponseHandler {
    public sendErrorResponse<T>(res: Response, status: number, message: string, error?: T): void {
        log.error(JSON.stringify({status, message, error}, null, 2));
        res.set('Content-Type', ContentType.JSON).status(status).send({errorMessage: message});
    }

    public sendInputValidationErrorResponse(res: Response, errors: ValidationError[]): void {
        const status = 400;

        const flattenValidationErrors = (errors: ValidationError[]): string[] => {
            const messages: string[] = [];
            errors.forEach(error => {
                if (error.constraints) {
                    Object.values(error.constraints).forEach(message => messages.push(message));
                }
                if (error.children && error.children.length > 0) {
                    messages.push(...flattenValidationErrors(error.children));
                }
            });
            return messages;
        };

        const errorMessage = "Input validation errors: " + flattenValidationErrors(errors).join('; ');

        log.error(JSON.stringify({status, errors}, null, 2));

        res.set('Content-Type', ContentType.JSON).status(status).send({errorMessage});
    }

    public sendNotAuthenticatedResponse(res: Response): void {
        const status = 401;
        const errorMessage = 'Not authenticated';
        log.error(JSON.stringify({status, errorMessage}, null, 2));

        res.set('Content-Type', ContentType.JSON).status(status).send({errorMessage});
    }

    public sendSuccessResponse<T>(res: Response, status: number, serviceResponse: ServiceResponse<T>): void {
        res.set('Content-Type', serviceResponse.contentType).status(status).send(serviceResponse.data);
    }
}
