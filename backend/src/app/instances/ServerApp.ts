import express, { Express } from "express";

import bodyParser from "body-parser";

import cors from "cors";

import routes from "../routes";

class ServerApp {
  express: Express;
  constructor() {
    this.express = express();
    this.midllewares();
    this.routes();
  }

  midllewares() {
    async function run(exp) {
      exp.use(
        cors({
          credentials: true,
          preflightContinue: true,
          methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
          origin: true,
        })
      );

      exp.use(express.json());
      exp.use(bodyParser.urlencoded({ extended: true }));
    }
    run(this.express);
  }

  routes() {
    this.express.use(routes);
  }
}

export default new ServerApp().express;
