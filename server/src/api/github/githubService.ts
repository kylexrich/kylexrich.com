import axios, { AxiosResponse } from 'axios';
import { ServiceResponse } from '../../types/ServiceResponse';
import { NotFoundError } from '../../errors/NotFoundError';
import { ContentType } from '../../types/ContentType';
import { GithubPullRequest, GithubPullRequestDTO } from './types/GithubPullRequest';
import { GithubLabel } from './types/GitHubLabel';

export async function getWebsiteGitHubPullRequests(): Promise<ServiceResponse<GithubPullRequestDTO[]>> {
    const response: AxiosResponse<GithubPullRequest[]> = await axios.get(
        'https://api.github.com/repos/kylexrich/kylexrich.com/pulls?state=all',
        {
            headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
        }
    );

    if (response.data.length === 0) {
        throw new NotFoundError('No pull requests found');
    }

    const mergedAndOpenPullRequests: GithubPullRequestDTO[] = response.data
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
