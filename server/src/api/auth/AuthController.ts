import { Request, Response } from 'express';
import { AuthService, LogoutMessage, UserData } from './AuthService';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest';
import { TokenService } from '../token/TokenService';
import { ServiceResponse } from '../../types/ServiceResponse';
import { UserExistsError } from '../../errors/UserExistsError';
import { AuthenticationError } from '../../errors/AuthenticationError';
import { log } from '../../config/log4jsConfig';
import { ResponseHandler } from '../../util/ResponseHandler';

export class AuthController {
    private readonly authService: AuthService;
    private readonly tokenService: TokenService;
    private readonly responseHandler: ResponseHandler;

    constructor(authService: AuthService, tokenService: TokenService, responseHandler: ResponseHandler) {
        this.authService = authService;
        this.tokenService = tokenService;
        this.responseHandler = responseHandler;
    }

    public async registerUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const result: ServiceResponse<UserData> = await this.authService.registerUser(email, password);
            const token: string = this.tokenService.signToken(result.data._id);
            this.tokenService.setTokenCookie(res, token);
            this.responseHandler.sendSuccessResponse(res, 201, result);
        } catch (error) {
            if (error instanceof UserExistsError) {
                this.responseHandler.sendErrorResponse(res, 409, error.message, error);
            } else {
                this.responseHandler.sendErrorResponse(res, 500, 'Error registering user', error);
            }
        }
    }

    public async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            const result: ServiceResponse<UserData> = await this.authService.loginUser(email, password);
            const token: string = this.tokenService.signToken(result.data._id);
            this.tokenService.setTokenCookie(res, token);
            this.responseHandler.sendSuccessResponse(res, 200, result);
        } catch (error) {
            if (error instanceof AuthenticationError) {
                this.responseHandler.sendErrorResponse(res, 401, error.message, error);
            } else {
                this.responseHandler.sendErrorResponse(res, 500, 'Error logging in', error);
            }
        }
    }

    public async getUser(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const result: ServiceResponse<UserData> = await this.authService.getUser(req.user.id);
            this.responseHandler.sendSuccessResponse(res, 200, result);
        } catch (error) {
            this.responseHandler.sendErrorResponse(res, 500, 'Error retrieving user', error);
        }
    }

    public async logoutUser(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const result: ServiceResponse<LogoutMessage> = await this.authService.logoutUser();
            this.tokenService.clearToken(res);
            this.responseHandler.sendSuccessResponse(res, 200, result);
        } catch (error) {
            this.responseHandler.sendErrorResponse(res, 500, 'Error logging out user', error);
        }
    }
}
