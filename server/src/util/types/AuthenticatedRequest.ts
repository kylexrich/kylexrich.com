import {Request} from 'express';
import {isObject} from '../helper/isObject.js';

export interface AuthenticatedRequest extends Request {
    user: { id: string };
}

export function isAuthenticatedRequest(req: Request): req is AuthenticatedRequest {
    return 'user' in req
        && isObject(req.user)
        && 'id' in req.user && typeof req.user.id === 'string';
}
