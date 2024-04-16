import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {MultiValueCache, SingleValueCache} from '../../util/helper/LocalCache.js';
import {GithubPullRequest} from './modelTypes/GithubPullRequest.js';
import {GithubRepo} from './modelTypes/GithubRepo.js';

export class GithubRepository {
    private readonly githubAxios: AxiosInstance;
    private readonly pullRequestCache: MultiValueCache<GithubPullRequest[]>;
    private readonly githubRepoCache: SingleValueCache<GithubRepo[]>;

    constructor(
        pullRequestCache: MultiValueCache<GithubPullRequest[]>,
        githubRepoCache: SingleValueCache<GithubRepo[]>
    ) {
        this.pullRequestCache = pullRequestCache;
        this.githubRepoCache = githubRepoCache;
        this.githubAxios = axios.create({
            baseURL: 'https://api.github.com/',
            headers: {Authorization: `token ${process.env.GITHUB_TOKEN}`}
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

    public async getKylexrichGithubRepositories(): Promise<GithubRepo[]> {
        const cachedData = this.githubRepoCache.get();

        if (cachedData !== null) {
            return cachedData;
        }

        const response: AxiosResponse<GithubRepo[]> = await this.githubAxios.get('users/kylexrich/repos');

        this.githubRepoCache.set(response.data);

        return response.data;
    }
}
