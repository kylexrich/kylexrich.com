import express, {Router} from 'express';
import {ResumeController} from './ResumeController.js';
import {TokenService} from '../token/TokenService.js';
import {upload} from '../../config/serverConfig.js';
import {asyncHandler} from '../../util/helper/asyncHandler.js';


export class ResumeRouterFactory {
    private readonly resumeController: ResumeController;
    private readonly tokenService: TokenService;

    constructor(resumeController: ResumeController, tokenService: TokenService) {
        this.resumeController = resumeController;
        this.tokenService = tokenService;
    }

    public createResumeRouter(): Router {
        const router = express.Router({mergeParams: true});

        router.post(
            '/',
            (req, res, next) => this.tokenService.verifyToken(req, res, next),
            upload.single('resume'),
            asyncHandler((req, res) => this.resumeController.uploadResume(req, res))
        );
        router.get(
            '/latest',
            (req, res, next) => this.tokenService.verifyToken(req, res, next),
            asyncHandler((req, res) => this.resumeController.getLatestResume(req, res))
        );

        return router;
    }
}
