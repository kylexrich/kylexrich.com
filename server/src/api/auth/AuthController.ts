import {Request, Response} from 'express';
import {AuthService, LogoutMessage, UserData} from './AuthService.js';
import {TokenService} from '../token/TokenService.js';
import {ResponseHandler} from '../../util/helper/ResponseHandler.js';
import {ServiceResponse} from '../../util/types/ServiceResponse.js';
import {UserExistsError} from '../../errors/UserExistsError.js';
import {AuthenticationError} from '../../errors/AuthenticationError.js';
import {isAuthenticatedRequest} from '../../util/types/AuthenticatedRequest.js';
import {plainToInstance} from "class-transformer";
import {UserInfoInput} from "./inputTypes/UserInfoInput.js";
import {validateSync} from "class-validator";
import {ValidationError} from "class-validator/types/validation/ValidationError.js";


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
            const input: UserInfoInput = plainToInstance(UserInfoInput, req.body as object);
            const validationErrors: ValidationError[] = validateSync(input);

            if (validationErrors.length > 0) {
                this.responseHandler.sendInputValidationErrorResponse(res, validationErrors);
                return;
            }

            const result: ServiceResponse<UserData> = await this.authService.registerUser(input);
            const token: string = this.tokenService.signToken(result.data._id as string);
            this.tokenService.setTokenCookie(res, token);
            this.responseHandler.sendSuccessResponse(res, 201, result);
        } catch (error) {
            if (error instanceof UserExistsError) {
                this.responseHandler.sendErrorResponse(res, 409, error.message, error);
            } else {
                this.responseHandler.sendErrorResponse(res, 500, 'Error registering authenticatedUser', error);
            }
        }
    }

    public async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const input: UserInfoInput = plainToInstance(UserInfoInput, req.body as object);
            const validationErrors: ValidationError[] = validateSync(input);

            if (validationErrors.length > 0) {
                this.responseHandler.sendInputValidationErrorResponse(res, validationErrors);
                return;
            }

            const result: ServiceResponse<UserData> = await this.authService.loginUser(input);
            const token: string = this.tokenService.signToken(result.data._id as string);
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

    public async getUser(req: Request, res: Response): Promise<void> {
        try {
            if (!isAuthenticatedRequest(req)) {
                this.responseHandler.sendNotAuthenticatedResponse(res);
                return;
            }
            const result: ServiceResponse<UserData> = await this.authService.getUser(req.authenticatedUser.id);
            this.responseHandler.sendSuccessResponse(res, 200, result);
        } catch (error) {
            this.responseHandler.sendErrorResponse(res, 500, 'Error retrieving authenticatedUser', error);
        }
    }

    public logoutUser(req: Request, res: Response): void {
        try {
            if (!isAuthenticatedRequest(req)) {
                this.responseHandler.sendNotAuthenticatedResponse(res);
                return;
            }
            const result: ServiceResponse<LogoutMessage> = this.authService.logoutUser();
            this.tokenService.clearToken(res);
            this.responseHandler.sendSuccessResponse(res, 200, result);
        } catch (error) {
            this.responseHandler.sendErrorResponse(res, 500, 'Error logging out authenticatedUser', error);
        }
    }
}