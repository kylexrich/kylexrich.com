import { Response } from 'express';
import { ServiceResponse } from '../types/ServiceResponse';
import { ContentType } from '../types/ContentType';
import { log } from '../config/log4jsConfig';

export function sendErrorResponse(res: Response, status: number, message: string, error: any): void {
    log.error(JSON.stringify({ status, message, error }, null, 2));
    res.set('Content-Type', ContentType.JSON).status(status).send({ error: message });
}

export function sendSuccessResponse(res: Response, status: number, serviceResponse: ServiceResponse): void {
    res.set('Content-Type', serviceResponse.contentType).status(status).send(serviceResponse.data);
}
