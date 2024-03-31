import { Request, Response } from 'express';
import { getUser, loginUser, logOutUser, registerUser } from './authService';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest';
import { clearToken, setTokenCookie, signToken } from '../token/tokenService';
import { sendErrorResponse, sendSuccessResponse } from '../../util/responseHelpers';
import { ServiceResponse } from '../../types/ServiceResponse';
import { UserExistsError } from '../../errors/UserExistsError';
import { AuthenticationError } from '../../errors/AuthenticationError';

export async function register(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        const result: ServiceResponse = await registerUser(email, password);
        const token = signToken(result.data.user?.id);
        setTokenCookie(res, token);
        sendSuccessResponse(res, 201, result);
    } catch (error) {
        if (error instanceof UserExistsError) {
            sendErrorResponse(res, 409, error.message, error);
        } else {
            sendErrorResponse(res, 500, 'Error registering user', error);
        }
    }
}

export async function login(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        const result: ServiceResponse = await loginUser(email, password);
        const token = signToken(result.data.user?.id);
        setTokenCookie(res, token);
        sendSuccessResponse(res, 200, result);
    } catch (error) {
        if (error instanceof AuthenticationError) {
            sendErrorResponse(res, 401, error.message, error);
        } else {
            sendErrorResponse(res, 500, 'Error logging in', error);
        }
    }
}

export async function me(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        const result: ServiceResponse = await getUser(req.user.id);
        sendSuccessResponse(res, 200, result);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error retrieving user', error);
    }
}

export async function logout(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        const result: ServiceResponse = await logOutUser();
        clearToken(res);
        sendSuccessResponse(res, 200, result);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error logging out user', error);
    }
}
