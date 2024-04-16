import {ServiceResponse} from '../../util/types/ServiceResponse.js';
import {GithubRepository} from './GithubRepository.js';
import {GithubPullRequest, GithubPullRequestDTO} from './modelTypes/GithubPullRequest.js';
import {NotFoundError} from '../../errors/NotFoundError.js';
import {GithubLabel} from './modelTypes/GitHubLabel.js';
import {ContentType} from '../../util/types/ContentType.js';
import {GithubRepo, GithubRepoDTO} from './modelTypes/GithubRepo.js';
import {RepositoryInput} from "./inputTypes/RepositoryInput.js";


export class GithubService {
    private readonly githubRepo: GithubRepository;

    constructor(githubRepo: GithubRepository) {
        this.githubRepo = githubRepo;
    }

    public async getKylexrichGithubPullRequests(repositoryInput: RepositoryInput): Promise<ServiceResponse<GithubPullRequestDTO[]>> {
        const githubPullRequests: GithubPullRequest[] = await this.githubRepo.getKylexrichGithubPullRequests(repositoryInput.repository);

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

    public async getKylexrichGithubRepositories(): Promise<ServiceResponse<GithubRepoDTO[]>> {
        const githubRepos: GithubRepo[] = await this.githubRepo.getKylexrichGithubRepositories();

        if (githubRepos.length === 0) {
            throw new NotFoundError('No repositories found');
        }

        const repositoriesDTO: GithubRepoDTO[] = githubRepos.map((repo: GithubRepo) => {
            return {
                name: repo.name,
                full_name: repo.full_name,
                html_url: repo.html_url,
                description: repo.description,
                fork: repo.fork,
                url: repo.url,
                created_at: repo.created_at,
                updated_at: repo.updated_at,
                pushed_at: repo.pushed_at,
                git_url: repo.git_url,
                ssh_url: repo.ssh_url,
                clone_url: repo.clone_url,
                svn_url: repo.svn_url,
                stargazers_count: repo.stargazers_count,
                watchers_count: repo.watchers_count,
                language: repo.language,
                forks_count: repo.forks_count,
                open_issues_count: repo.open_issues_count
            };
        });

        return {
            data: repositoriesDTO,
            contentType: ContentType.JSON
        };
    }
}
