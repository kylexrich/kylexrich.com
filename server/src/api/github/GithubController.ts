import { Request, Response } from 'express';
import { GithubService } from './GithubService';
import { ServiceResponse } from '../../util/types/ServiceResponse';
import { NotFoundError } from '../../errors/NotFoundError';
import { GithubPullRequestDTO } from './types/GithubPullRequest';
import { ResponseHandler } from '../../util/helper/ResponseHandler';

export class GithubController {
    private readonly githubService: GithubService;
    private readonly responseHandler: ResponseHandler;

    constructor(githubService: GithubService, responseHandler: ResponseHandler) {
        this.githubService = githubService;
        this.responseHandler = responseHandler;
    }

    public async getKylexrichGithubPullRequests(req: Request, res: Response): Promise<void> {
        try {
            const { repository } = req.params;
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
}
