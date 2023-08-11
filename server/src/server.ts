import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import connectToDB from "./config/connectToDB";
import * as path from "path";
import resumeRoutes from "./routes/resumeRoutes";
import * as log4js from "log4js";
import { httpLogger, log } from "./config/log4jsConfig";
import fileUpload from "express-fileupload";

const env = process.env.NODE_ENV;

class Server {
  private readonly app: Express;
  private readonly port: string | number;
  private readonly origin: string;
  private readonly host: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.host = env === "production" ? `https://my.herokuapp.com/` : `http://localhost`;
    this.origin = env === "production" ? `${this.host}:${this.port}` : `http://localhost:${3000}`;
    this.setupExpress();
    this.setupRoutes();
    this.serveBuild();
    this.run();
  }

  private setupExpress(): void {
    const corsOptions = {
      origin: this.origin,
    };
    this.app.use(log4js.connectLogger(httpLogger, { level: "auto" }));
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(fileUpload());
  }

  private setupRoutes(): void {
    this.app.use("/api/resume", resumeRoutes);
  }

  private serveBuild(): void {
    if (process.env.NODE_ENV !== "development") {
      const buildPath = path.join(__dirname, "../../client/build");
      this.app.use(express.static(buildPath));
      this.app.get("*", (req, res) => {
        res.sendFile(path.resolve(buildPath, "index.html"));
      });
    }
  }

  private run(): void {
    connectToDB()
      .then(() => {
        this.app.listen(this.port, () => {
          log.info(
            `[[${env}] Running on port ${this.port}! Server URL: ${this.host}:${this.port}, Frontend Origin: ${this.origin}`,
          );
        });
      })
      .catch(() => {
        this.app.listen(this.port, () => {
          log.warn(
            `[${env}] Running on port ${this.port} without DB Connection. Server URL: ${this.host}:${this.port}, Frontend Origin: ${this.origin}`,
          );
        });
      });
  }
}

new Server();
