import { AuthRepository } from './api/auth/AuthRepository';
import { AuthService } from './api/auth/AuthService';
import { AuthController } from './api/auth/AuthController';
import { AuthRouterFactory } from './api/auth/AuthRouterFactory';
import { TokenService } from './api/token/TokenService';
import { ResumeRouterFactory } from './api/resume/ResumeRouterFactory';
import { ResumeRepository } from './api/resume/ResumeRepository';
import { ResumeService } from './api/resume/ResumeService';
import { ResumeController } from './api/resume/ResumeController';
import { GithubRepository } from './api/github/GithubRepository';
import { GithubService } from './api/github/GithubService';
import { GithubController } from './api/github/GithubController';
import { GithubRouterFactory } from './api/github/GithubRouterFactory';
import { ResponseHandler } from './util/helper/ResponseHandler';
import {CacheExpiration, MultiValueCache, SingleValueCache} from './util/helper/LocalCache';
import { GithubPullRequest } from './api/github/types/GithubPullRequest';
import {GithubRepo} from "./api/github/types/GithubRepo";

export class DependencyInjector {
    private readonly responseHandler: ResponseHandler;

    private readonly tokenService: TokenService;

    private readonly authRepository: AuthRepository;
    private readonly authService: AuthService;
    private readonly authController: AuthController;
    private readonly authRouterFactory: AuthRouterFactory;

    private readonly resumeRepository: ResumeRepository;
    private readonly resumeService: ResumeService;
    private readonly resumeController: ResumeController;
    private readonly resumeRouterFactory: ResumeRouterFactory;

    private readonly githubRepository: GithubRepository;
    private readonly githubService: GithubService;
    private readonly githubController: GithubController;
    private readonly githubRouterFactory: GithubRouterFactory;

    constructor() {
        this.responseHandler = new ResponseHandler();

        this.tokenService = new TokenService(this.responseHandler);

        this.authRepository = new AuthRepository();
        this.authService = new AuthService(this.authRepository);
        this.authController = new AuthController(this.authService, this.tokenService, this.responseHandler);
        this.authRouterFactory = new AuthRouterFactory(this.authController, this.tokenService);

        this.resumeRepository = new ResumeRepository();
        this.resumeService = new ResumeService(this.resumeRepository);
        this.resumeController = new ResumeController(this.resumeService, this.responseHandler);
        this.resumeRouterFactory = new ResumeRouterFactory(this.resumeController, this.tokenService);

        const pullRequestCache = new MultiValueCache<GithubPullRequest[]>(CacheExpiration.DAILY);
        const githubRepoCache = new SingleValueCache<GithubRepo[]>(CacheExpiration.DAILY);
        this.githubRepository = new GithubRepository(pullRequestCache, githubRepoCache);
        this.githubService = new GithubService(this.githubRepository);
        this.githubController = new GithubController(this.githubService, this.responseHandler);
        this.githubRouterFactory = new GithubRouterFactory(this.githubController);
    }

    getAuthRouterFactory(): AuthRouterFactory {
        return this.authRouterFactory;
    }

    getResumeRouterFactory(): ResumeRouterFactory {
        return this.resumeRouterFactory;
    }

    getGithubRouterFactory(): GithubRouterFactory {
        return this.githubRouterFactory;
    }
}
