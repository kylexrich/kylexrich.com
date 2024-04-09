import { Request, Response } from 'express';
import { GithubService } from './GithubService';
import { ServiceResponse } from '../../types/ServiceResponse';
import { NotFoundError } from '../../errors/NotFoundError';
import { GithubPullRequestDTO } from './types/GithubPullRequest';
import { ResponseHandler } from '../../util/ResponseHandler';

export class GithubController {
    private readonly githubService: GithubService;
    private readonly responseHandler: ResponseHandler;

    constructor(githubService: GithubService, responseHandler: ResponseHandler) {
        this.githubService = githubService;
        this.responseHandler = responseHandler;
    }

    public async getKyleRichWebsiteGithubPullRequests(req: Request, res: Response): Promise<void> {
        try {
            const result: ServiceResponse<GithubPullRequestDTO[]> = await this.githubService.getKyleRichWebsiteGithubPullRequests();

            this.responseHandler.sendSuccessResponse(res, 200, result);
        } catch (error) {
            if (error instanceof NotFoundError) {
                this.responseHandler.sendErrorResponse(res, 404, error.message, error);
            } else {
                this.responseHandler.sendErrorResponse(res, 500, 'Error fetching pull requests', error);
            }
        }
    }
}
