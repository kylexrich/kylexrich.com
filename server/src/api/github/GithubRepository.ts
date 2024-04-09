import { GithubPullRequest } from './types/GithubPullRequest';
import axios, { AxiosResponse } from 'axios';

export class GithubRepository {
    public async getKyleRichWebsiteGithubPullRequests(): Promise<GithubPullRequest[]> {
        const response: AxiosResponse<GithubPullRequest[]> = await axios.get(
            'https://api.github.com/repos/kylexrich/kylexrich.com/pulls?state=all',
            {
                headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
            }
        );

        return response.data;
    }
}
