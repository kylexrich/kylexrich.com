import { Request, Response } from 'express';
import { getWebsiteGitHubPullRequests } from './githubService';
import { sendErrorResponse, sendSuccessResponse } from '../../util/responseHelpers';
import { ServiceResponse } from '../../types/ServiceResponse';
import { NotFoundError } from '../../errors/NotFoundError';
import { GithubPullRequestDTO } from './types/GithubPullRequest';

export async function fetchWebsiteGithubPullRequests(req: Request, res: Response): Promise<void> {
    try {
        const result: ServiceResponse<GithubPullRequestDTO[]> = await getWebsiteGitHubPullRequests();

        sendSuccessResponse(res, 200, result);
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(res, 404, error.message, error);
        } else {
            sendErrorResponse(res, 500, 'Error fetching pull requests', error);
        }
    }
}
