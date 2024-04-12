import { GithubPullRequest } from './types/GithubPullRequest';
import axios, { AxiosResponse } from 'axios';
import { CacheExpiration, LocalCache } from '../../util/helper/LocalCache';

export class GithubRepository {
    private readonly pullRequestCache: LocalCache<GithubPullRequest[]>;

    constructor(pullRequestCache: LocalCache<GithubPullRequest[]>) {
        this.pullRequestCache = pullRequestCache;
    }

    public async getKylexrichGithubPullRequests(repository: string): Promise<GithubPullRequest[]> {
        const cachedData = this.pullRequestCache.get(repository);

        if (cachedData !== null) {
            return cachedData;
        }

        const response: AxiosResponse<GithubPullRequest[]> = await axios.get(
            `https://api.github.com/repos/kylexrich/${repository}/pulls?state=all`,
            {
                headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
            }
        );

        this.pullRequestCache.set(repository, response.data);

        return response.data;
    }
}
