import {ExpressRequestCallback} from "../../types/ExpressUtilityTypes.js";
import {RandomAlbumService} from "../../services/random-album/randomAlbum.service.js";
import {SpotifyToken} from "../../models/SpotifyToken.js";

export const GetRandomAlbum: ExpressRequestCallback = async (req, res, next) => {
  const token = new SpotifyToken(req.cookies.spotifyToken).getToken();
  const albumService = new RandomAlbumService(token);
  try{
    const albums = await albumService.get();
    res.status(200).send(albums);
  } catch(e) {
    next(e.message)
  }
}
