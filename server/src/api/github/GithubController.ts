import {Request, Response} from 'express';
import {ResponseHandler} from '../../util/helper/ResponseHandler.js';
import {GithubService} from './GithubService.js';
import {ServiceResponse} from '../../util/types/ServiceResponse.js';
import {GithubPullRequestDTO} from './types/GithubPullRequest.js';
import {NotFoundError} from '../../errors/NotFoundError.js';
import {GithubRepoDTO} from './types/GithubRepo.js';
import {BadRequestError} from '../../errors/BadRequestError.js';

export class GithubController {
    private readonly githubService: GithubService;
    private readonly responseHandler: ResponseHandler;

    constructor(githubService: GithubService, responseHandler: ResponseHandler) {
        this.githubService = githubService;
        this.responseHandler = responseHandler;
    }

    public async getKylexrichGithubPullRequests(req: Request, res: Response): Promise<void> {
        try {
            const {repository} = req.params;

            if (!repository) {
                throw new BadRequestError('No repository provided');
            }

            const result: ServiceResponse<GithubPullRequestDTO[]> = await this.githubService.getKylexrichGithubPullRequests(repository);

            this.responseHandler.sendSuccessResponse(res, 200, result);
        } catch (error) {
            if (error instanceof NotFoundError) {
                this.responseHandler.sendErrorResponse(res, 404, error.message, error);
            } else {
                this.responseHandler.sendErrorResponse(res, 500, 'Error fetching pull requests', error);
            }
        }
    }

    public async getKylexrichGithubRepositories(req: Request, res: Response): Promise<void> {
        try {
            const result: ServiceResponse<GithubRepoDTO[]> = await this.githubService.getKylexrichGithubRepositories();

            this.responseHandler.sendSuccessResponse(res, 200, result);
        } catch (error) {
            if (error instanceof NotFoundError) {
                this.responseHandler.sendErrorResponse(res, 404, error.message, error);
            } else {
                this.responseHandler.sendErrorResponse(res, 500, 'Error fetching repositories', error);
            }
        }
    }
}
