import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { GithubPullRequest } from './types/GithubPullRequest';
import { GithubRepo } from './types/GithubRepo';
import { MultiValueCache, SingleValueCache } from '../../util/helper/LocalCache';

export class GithubRepository {
    private readonly githubAxios: AxiosInstance;
    private readonly pullRequestCache: MultiValueCache<GithubPullRequest[]>;
    private readonly githubRepoCache: SingleValueCache<GithubRepo[]>;

    constructor(pullRequestCache: MultiValueCache<GithubPullRequest[]>, githubRepoCache: SingleValueCache<GithubRepo[]>) {
        this.pullRequestCache = pullRequestCache;
        this.githubRepoCache = githubRepoCache;
        this.githubAxios = axios.create({
            baseURL: 'https://api.github.com/',
            headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
        });
    }

    public async getKylexrichGithubPullRequests(repository: string): Promise<GithubPullRequest[]> {
        const cachedData = this.pullRequestCache.get(repository);

        if (cachedData !== null) {
            return cachedData;
        }

        const response: AxiosResponse<GithubPullRequest[]> = await this.githubAxios.get(`repos/kylexrich/${repository}/pulls?state=all`);

        this.pullRequestCache.set(repository, response.data);

        return response.data;
    }

    public async getKyleRichWebsiteGithubRepositories(): Promise<GithubRepo[]> {
        const cachedData = this.githubRepoCache.get();

        if (cachedData !== null) {
            return cachedData;
        }

        const response: AxiosResponse<GithubRepo[]> = await this.githubAxios.get('users/kylexrich/repos');

        this.githubRepoCache.set(response.data);

        return response.data;
    }
}
