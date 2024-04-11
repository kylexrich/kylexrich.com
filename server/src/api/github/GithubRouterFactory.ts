import express, { Router } from 'express';
import { GithubController } from './GithubController';

export class GithubRouterFactory {
    private readonly githubController: GithubController;

    constructor(githubController: GithubController) {
        this.githubController = githubController;
    }

    public createGithubRouter(): Router {
        const router = express.Router({ mergeParams: true });

        router.get('/:repository/pull-requests', (req, res) => this.githubController.getKylexrichGithubPullRequests(req, res));
        router.get('/repositories', (req, res) => this.githubController.getKylexrichGithubRepositories(req, res));

        return router;
    }
}
