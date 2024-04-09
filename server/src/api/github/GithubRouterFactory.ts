import express, { Router } from 'express';
import { GithubController } from './GithubController';

export class GithubRouterFactory {
    private readonly githubController: GithubController;

    constructor(githubController: GithubController) {
        this.githubController = githubController;
    }

    public createGithubRouter(): Router {
        const router = express.Router({ mergeParams: true });

        router.get('/pull-requests', (req, res) => this.githubController.getKyleRichWebsiteGithubPullRequests(req, res));

        return router;
    }
}
