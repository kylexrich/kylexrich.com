import {Request, Response} from 'express';
import {ResponseHandler} from '../../util/helper/ResponseHandler.js';
import {GithubService} from './GithubService.js';
import {ServiceResponse} from '../../util/types/ServiceResponse.js';
import {GithubPullRequestDTO} from './modelTypes/GithubPullRequest.js';
import {NotFoundError} from '../../errors/NotFoundError.js';
import {GithubRepoDTO} from './modelTypes/GithubRepo.js';
import {plainToInstance} from "class-transformer";
import {ValidationError} from "class-validator/types/validation/ValidationError.js";
import {validateSync} from "class-validator";
import {RepositoryInput} from "./inputTypes/RepositoryInput.js";

export class GithubController {
    private readonly githubService: GithubService;
    private readonly responseHandler: ResponseHandler;

    constructor(githubService: GithubService, responseHandler: ResponseHandler) {
        this.githubService = githubService;
        this.responseHandler = responseHandler;
    }

    public async getKylexrichGithubPullRequests(req: Request, res: Response): Promise<void> {
        try {
            const input: RepositoryInput = plainToInstance(RepositoryInput, req.params);
            const validationErrors: ValidationError[] = validateSync(input);

            if (validationErrors.length > 0) {
                this.responseHandler.sendInputValidationErrorResponse(res, validationErrors);
                return;
            }

            const result: ServiceResponse<GithubPullRequestDTO[]> = await this.githubService.getKylexrichGithubPullRequests(input);

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
