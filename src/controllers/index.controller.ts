import express, {Router} from 'express';
import {IMiddlewareController} from "../interfaces/IController.js";
import {ExpressMiddlewareCallback} from "../types/ExpressUtilityTypes.js";
import {spotifyAccessToken} from "../middleware/spotifyAccessToken.middleware.js";
import {RandomAlbumController} from "./random-album/randomAlbum.controller.js";

export class UnifiedControllerRouter implements IMiddlewareController {
  private router: Router;

  constructor() {
    this.router = express.Router();

    this.assignMiddleware(spotifyAccessToken)
    this.assignMiddleware(new RandomAlbumController().getRouter())
  }

  assignMiddleware(callback: ExpressMiddlewareCallback) {
    this.router.use(callback);
  }

  getRouter(): Router {
    return this.router;
  }
}
