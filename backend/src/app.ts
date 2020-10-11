import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import config from "./config/config";
import api from './api';
import * as errorHandler from "./helpers/errorHandler";

class App {
  public express: express.Application;

  private corsOptions = {
    // origin: (origin, callback) => {
    //   if (!config.APP) {
    //     return callback(null, true);
    //   }
    //   if (!origin || config.APP !== origin) {
    //     return callback(new Error("Not Found"), false);
    //   }
    //   return callback(null, true);
    // },
    credentials: true,
    allowedHeaders: [
      "Save-Data",
      "Content-Type",
      "Authorization",
      "Content-Length",
      "X-Requested-With",
      "Accept"
    ]
  };

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.express.use(cors(this.corsOptions));
    this.express.use(morgan("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(helmet());
  }

  private setRoutes(): void {
    this.express.use("/", api);
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
  } 
}

export default new App().express;