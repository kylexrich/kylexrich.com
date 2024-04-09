import express, { Router } from 'express';
import { ResumeController } from './ResumeController';
import { TokenService } from '../token/TokenService';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest';

export class ResumeRouterFactory {
    private readonly resumeController: ResumeController;
    private readonly tokenService: TokenService;

    constructor(resumeController: ResumeController, tokenService: TokenService) {
        this.resumeController = resumeController;
        this.tokenService = tokenService;
    }

    public createResumeRouter(): Router {
        const router = express.Router({ mergeParams: true });

        router.post(
            '/',
            (req, res, next) => this.tokenService.verifyToken(req, res, next),
            (req, res) => this.resumeController.uploadResume(req as AuthenticatedRequest, res)
        );
        router.get(
            '/latest',
            (req, res, next) => this.tokenService.verifyToken(req, res, next),
            (req, res) => this.resumeController.getLatestResume(req as AuthenticatedRequest, res)
        );

        return router;
    }
}
