import {Request} from 'express';
import {isObject} from '../helper/isObject.js';

export interface AuthenticatedRequest extends Request {
    authenticatedUser: { id: string };
}

export function isAuthenticatedRequest(req: Request): req is AuthenticatedRequest {
    return 'authenticatedUser' in req
        && isObject(req.authenticatedUser)
        && 'id' in req.authenticatedUser && typeof req.authenticatedUser.id === 'string';
}