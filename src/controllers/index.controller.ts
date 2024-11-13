import express, {Router} from 'express';
import {IMiddlewareController} from "../interfaces/IController.js";
import {ExpressMiddlewareCallback} from "../types/ExpressUtilityTypes.js";
import {spotifyAccessToken} from "../middleware/spotifyAccessToken.middleware.js";

export class UnifiedControllerRouter implements IMiddlewareController {
  private router: Router;

  constructor() {
    this.router = express.Router();

    this.assignMiddleware(spotifyAccessToken)
    this.assignMiddleware((req, res) => {res.send("hi")})
  }

  assignMiddleware(callback: ExpressMiddlewareCallback) {
    this.router.use(callback);
  }

  getRouter(): Router {
    return this.router;
  }
}
