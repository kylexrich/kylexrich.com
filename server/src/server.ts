import 'dotenv/config';
import express, { Express } from 'express';
import cors from 'cors';
import connectToDB from './config/connectToDB';
import * as path from 'path';
import * as log4js from 'log4js';
import { httpLogger, log } from './config/log4jsConfig';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import resumeRoutes from './api/resume/resumeRoutes';
import authRoutes from './api/auth/authRoutes';

const env = process.env.NODE_ENV;
const port = process.env.PORT || 3001;
let host: string;
switch (env) {
    case 'development':
        host = `http://localhost:${port}`;
        break;
    case 'staging':
        host = 'https://kylexrich-staging-d5a9dbd6a715.herokuapp.com';
        break;
    case 'production':
        host = 'https://kylexrich-402391673bb6.herokuapp.com';
        break;
    default:
        host = `http://localhost:${port}`;
}

class Server {
    private readonly app: Express;
    private readonly port: string | number;
    private readonly origin: string;
    private readonly host: string;

    constructor() {
        this.app = express();
        this.port = port;
        this.host = host;
        this.origin = this.host.endsWith(String(this.port)) ? `http://localhost:${3000}` : this.host;
        this.setupExpress();
        this.setupRoutes();
        this.serveBuild();
        this.run();
    }

    private setupExpress(): void {
        log.debug(this.origin);
        const corsOptions = {
            origin: this.origin,
            credentials: true
        };
        this.app.use(log4js.connectLogger(httpLogger, { level: 'auto' }));
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(fileUpload());
        this.app.use(cookieParser());
    }

    private setupRoutes(): void {
        this.app.use('/api/resume', resumeRoutes);
        this.app.use('/api/auth', authRoutes);
    }

    private serveBuild(): void {
        if (process.env.NODE_ENV !== 'development') {
            const buildPath = path.join(__dirname, '../../client/build');
            this.app.use(express.static(buildPath));
            this.app.get('*', (req, res) => {
                res.sendFile(path.resolve(buildPath, 'index.html'));
            });
        }
    }

    private run(): void {
        connectToDB()
            .then(() => {
                this.app.listen(this.port, () => {
                    log.info(
                        `[[${env}] Running on port ${this.port}! Server URL: ${this.host}, Frontend Origin: ${this.origin}`
                    );
                });
            })
            .catch(() => {
                this.app.listen(this.port, () => {
                    log.warn(
                        `[${env}] Running on port ${this.port} without DB Connection. Server URL: ${this.host}, Frontend Origin: ${this.origin}`
                    );
                });
            });
    }
}

new Server();
