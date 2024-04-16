import express, {Router} from 'express';
import {AuthController} from './AuthController.js';
import {TokenService} from '../token/TokenService.js';
import {AuthenticatedRequest} from '../../util/types/AuthenticatedRequest.js';
import {asyncHandler} from '../../util/helper/asyncHandler.js';


export class AuthRouterFactory {
    private readonly authController: AuthController;
    private readonly tokenService: TokenService;

    constructor(authController: AuthController, tokenService: TokenService) {
        this.authController = authController;
        this.tokenService = tokenService;
    }

    public createAuthRouter(): Router {
        const router = express.Router({mergeParams: true});

        router.post('/login', asyncHandler((req, res) => this.authController.loginUser(req, res)));
        router.get('/me',
            (req, res, next) => this.tokenService.verifyToken(req, res, next),
            asyncHandler((req, res) => this.authController.getUser(req, res)));
        router.post('/logout',
            (req, res, next) => this.tokenService.verifyToken(req, res, next),
            (req, res) => this.authController.logoutUser(req as AuthenticatedRequest, res));

        return router;
    }
}
