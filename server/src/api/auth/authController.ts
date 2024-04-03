import { Request, Response } from 'express';
import { getUser, loginUser, LogoutMessage, logOutUser, registerUser, UserData } from './authService';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest';
import { clearToken, setTokenCookie, signToken } from '../token/tokenService';
import { sendErrorResponse, sendSuccessResponse } from '../../util/responseHelpers';
import { ServiceResponse } from '../../types/ServiceResponse';
import { UserExistsError } from '../../errors/UserExistsError';
import { AuthenticationError } from '../../errors/AuthenticationError';

export async function register(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        const result: ServiceResponse<UserData> = await registerUser(email, password);
        const token: string = signToken(result.data._id);
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
        const result: ServiceResponse<UserData> = await loginUser(email, password);
        const token: string = signToken(result.data._id);
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
        const result: ServiceResponse<UserData> = await getUser(req.user.id);
        sendSuccessResponse(res, 200, result);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error retrieving user', error);
    }
}

export async function logout(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
        const result: ServiceResponse<LogoutMessage> = await logOutUser();
        clearToken(res);
        sendSuccessResponse(res, 200, result);
    } catch (error) {
        sendErrorResponse(res, 500, 'Error logging out user', error);
    }
}
