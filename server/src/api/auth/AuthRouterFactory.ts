import express, { Router } from 'express';
import { TokenService } from '../token/TokenService';
import { AuthController } from './AuthController';
import { AuthenticatedRequest } from '../../util/types/AuthenticatedRequest';

export class AuthRouterFactory {
    private readonly authController: AuthController;
    private readonly tokenService: TokenService;

    constructor(authController: AuthController, tokenService: TokenService) {
        this.authController = authController;
        this.tokenService = tokenService;
    }

    public createAuthRouter(): Router {
        const router = express.Router({ mergeParams: true });

        router.post('/login', (req, res) => this.authController.loginUser(req, res));
        router.get(
            '/me',
            (req, res, next) => this.tokenService.verifyToken(req, res, next),
            (req, res) => this.authController.getUser(req as AuthenticatedRequest, res)
        );
        router.post(
            '/logout',
            (req, res, next) => this.tokenService.verifyToken(req, res, next),
            (req, res) => this.authController.logoutUser(req as AuthenticatedRequest, res)
        );

        return router;
    }
}
