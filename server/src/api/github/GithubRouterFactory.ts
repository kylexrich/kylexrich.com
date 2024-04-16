import express, {Router} from 'express';
import {GithubController} from './GithubController.js';
import {asyncHandler} from '../../util/helper/asyncHandler.js';

export class GithubRouterFactory {
    private readonly githubController: GithubController;

    constructor(githubController: GithubController) {
        this.githubController = githubController;
    }

    public createGithubRouter(): Router {
        const router = express.Router({mergeParams: true});

        router.get('/:repository/pull-requests',
            asyncHandler((req, res) => this.githubController.getKylexrichGithubPullRequests(req, res)));
        router.get('/repositories', asyncHandler((req, res) => this.githubController.getKylexrichGithubRepositories(req, res)));

        return router;
    }
}
