import { GithubPullRequest } from './types/GithubPullRequest';
import axios, { AxiosResponse } from 'axios';
import { CacheExpiration, LocalCache } from '../../util/LocalCache';

export class GithubRepository {
    private readonly pullRequestCache: LocalCache<GithubPullRequest[]>;

    constructor(pullRequestCache: LocalCache<GithubPullRequest[]>) {
        this.pullRequestCache = pullRequestCache;
    }

    public async getKyleRichWebsiteGithubPullRequests(): Promise<GithubPullRequest[]> {
        const cacheKey = 'kylexrich.com';
        const cachedData = this.pullRequestCache.get(cacheKey);

        if (cachedData !== null) {
            return cachedData;
        }

        const response: AxiosResponse<GithubPullRequest[]> = await axios.get(
            'https://api.github.com/repos/kylexrich/kylexrich.com/pulls?state=all',
            {
                headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
            }
        );

        this.pullRequestCache.set(cacheKey, response.data);

        return response.data;
    }
}
