import { Response } from 'express';
import { ServiceResponse } from '../types/ServiceResponse';
import { ContentType } from '../types/ContentType';
import { log } from '../../config/log4jsConfig';

export class ResponseHandler {
    public sendErrorResponse<T>(res: Response, status: number, message: string, error: T): void {
        log.error(JSON.stringify({ status, message, error }, null, 2));
        res.set('Content-Type', ContentType.JSON).status(status).send({ errorMessage: message });
    }

    public sendSuccessResponse<T>(res: Response, status: number, serviceResponse: ServiceResponse<T>): void {
        res.set('Content-Type', serviceResponse.contentType).status(status).send(serviceResponse.data);
    }
}
