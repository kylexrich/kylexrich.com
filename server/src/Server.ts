import 'dotenv/config';
import express, {Express} from 'express';
import cors from 'cors';
import path from 'path';
import log4js from 'log4js';
import cookieParser from 'cookie-parser';
import {DependencyInjector} from './DependencyInjector.js';
import {ENV, HOST_URL, PORT} from './config/serverConfig.js';
import {httpLogger, log} from './config/log4jsConfig.js';
import connectToDB from './config/connectToDB.js';

class Server {
    private readonly app: Express;
    private readonly port: string | number;
    private readonly origin: string;
    private readonly host: string;
    private readonly env: string;
    private readonly di: DependencyInjector;

    constructor() {
        this.app = express();
        this.port = PORT;
        this.host = HOST_URL;
        this.env = ENV;
        this.origin = this.host.endsWith(String(this.port)) ? `http://localhost:${3000}` : this.host;
        this.di = new DependencyInjector();
        this.setupExpress();
        this.setupRoutes();
        this.serveBuild();
        this.run();
    }

    private setupExpress(): void {
        const corsOptions = {
            origin: this.origin, credentials: true
        };
        this.app.use(log4js.connectLogger(httpLogger, {level: 'auto'}));
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cookieParser());
    }

    private setupRoutes(): void {
        this.app.use('/api/auth', this.di.getAuthRouterFactory().createAuthRouter());
        this.app.use('/api/resume', this.di.getResumeRouterFactory().createResumeRouter());
        this.app.use('/api/github', this.di.getGithubRouterFactory().createGithubRouter());
    }

    private serveBuild(): void {
        if (this.env !== 'development') {
            const buildPath = path.join(import.meta.dirname, '../../client/build');
            this.app.use(express.static(buildPath));
            this.app.get('*', (_, res) => res.sendFile(path.resolve(buildPath, 'index.html')));
        }
    }

    private run(): void {
        connectToDB()
            .then(() => {
                this.app.listen(this.port, () => {
                    log.info(`[[${this.env}] Running on port ${this.port}! Server URL: ${this.host}, Frontend Origin: ${this.origin}`);
                });
            })
            .catch(() => {
                this.app.listen(this.port, () => {
                    log.warn(`[${this.env}] Running on port ${this.port} without DB Connection. Server URL: ${this.host}, Frontend Origin: ${this.origin}`);
                });
            });
    }
}

new Server();
