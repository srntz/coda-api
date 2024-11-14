import {ExpressRequestCallback} from "../../types/ExpressUtilityTypes.js";
import {RandomAlbumService} from "../../services/random-album/randomAlbum.service.js";
import {SpotifyToken} from "../../models/SpotifyToken.js";

export const GetRandomAlbum: ExpressRequestCallback = (req, res) => {
  const token = new SpotifyToken(req.cookies.spotifyToken).getToken();
  const albumService = new RandomAlbumService(token);
  albumService.get();
  res.send("random album")
}
