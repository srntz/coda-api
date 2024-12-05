import {IController} from "../../interfaces/IController.js";
import express, {NextFunction} from "express";
import {ExpressRequestCallback} from "../../types/ExpressUtilityTypes.js";
import {SpotifyToken} from "../../models/SpotifyToken.js";
import {AlbumSearchService} from "../../services/album-search/albumSearch.service.js";

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

  private GetAlbumSearchResults: ExpressRequestCallback = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const token = new SpotifyToken(req.cookies.spotifyToken).getToken();
    const service = new AlbumSearchService(token, req.query.q as string)
    try{
      const result = await service.get()
      res.status(200).send(result)
    } catch(e) {
      next(e.message)
    }
  }
}
