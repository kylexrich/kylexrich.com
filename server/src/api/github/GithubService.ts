import { ServiceResponse } from '../../types/ServiceResponse';
import { NotFoundError } from '../../errors/NotFoundError';
import { ContentType } from '../../types/ContentType';
import { GithubPullRequest, GithubPullRequestDTO } from './types/GithubPullRequest';
import { GithubLabel } from './types/GitHubLabel';
import { GithubRepository } from './GithubRepository';

export class GithubService {
    private readonly githubRepo: GithubRepository;

    constructor(githubRepo: GithubRepository) {
        this.githubRepo = githubRepo;
    }

    public async getKyleRichWebsiteGithubPullRequests(): Promise<ServiceResponse<GithubPullRequestDTO[]>> {
        const githubPullRequests: GithubPullRequest[] = await this.githubRepo.getKyleRichWebsiteGithubPullRequests();

        if (githubPullRequests.length === 0) {
            throw new NotFoundError('No pull requests found');
        }

        const mergedAndOpenPullRequests: GithubPullRequestDTO[] = githubPullRequests
            .filter((pullRequest: GithubPullRequest) => {
                return pullRequest.state === 'open' || pullRequest.merged_at !== null;
            })
            .map((pullRequest: GithubPullRequest) => {
                return {
                    title: pullRequest.title,
                    body: pullRequest.body,
                    state: pullRequest.state,
                    html_url: pullRequest.html_url,
                    merged_at: pullRequest.merged_at,
                    labels: pullRequest.labels.map((label: GithubLabel) => {
                        return {
                            name: label.name,
                            description: label.description,
                            color: '#' + label.color
                        };
                    })
                };
            });

        return {
            data: mergedAndOpenPullRequests,
            contentType: ContentType.JSON
        };
    }
}
