import express, {ErrorRequestHandler, Router} from 'express';
import {IMiddlewareController} from "../interfaces/IController.js";
import {ExpressErrorHandlingMiddlewareCallback, ExpressMiddlewareCallback} from "../types/ExpressUtilityTypes.js";
import {spotifyAccessToken} from "../middleware/spotifyAccessToken.middleware.js";
import {RandomAlbumController} from "./random-album/randomAlbum.controller.js";
import {spotifyRequestErrorHandler} from "../middleware/spotifyRequestErrorHandler.middleware.js";
import {AlbumSearchController} from "./album-search/albumSearch.controller.js";
import {AuthController} from "./auth/auth.controller.js";

export class UnifiedControllerRouter implements IMiddlewareController {
  private router: Router;

  constructor() {
    this.router = express.Router();

    // this.assignMiddleware(spotifyAccessToken)
    this.assignMiddleware(new AuthController().getRouter())
    this.assignMiddleware(new RandomAlbumController().getRouter())
    this.assignMiddleware(new AlbumSearchController().getRouter())
    this.assignMiddleware(spotifyRequestErrorHandler)
  }

  assignMiddleware(callback: ExpressMiddlewareCallback | ExpressErrorHandlingMiddlewareCallback) {
    this.router.use(callback);
  }

  getRouter(): Router {
    return this.router;
  }
}
