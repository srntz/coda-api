import {IController} from "../../interfaces/IController.js";
import express from "express";
import {ExpressRequestCallback} from "../../types/ExpressUtilityTypes.js";
import {SpotifyToken} from "../../models/SpotifyToken.js";

export class AlbumSearchController implements IController {
  private router: express.Router;

  constructor() {
    this.router = express.Router();

    this.assignGetRequestCallback("/search-album", this.GetAlbumSearchResults)
  }

  assignGetRequestCallback(route: string, callback: ExpressRequestCallback) {
    this.router.get(route, callback);
  }

  getRouter() {
    return this.router;
  }

  private GetAlbumSearchResults: ExpressRequestCallback = (req: express.Request, res: express.Response) => {
    const token = new SpotifyToken(req.cookies.spotifyToken).getToken();
    const query = req.query.q;
  }
}
