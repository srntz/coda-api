import {IService} from "../../interfaces/IService.js";
import AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified;
import {SpotifyToken} from "../../models/SpotifyToken.js";
import {IToken} from "../../interfaces/IToken.js";
import {ICodaErrorObject} from "../../types/SpotifyApiUtilityTypes.js";

export class AlbumSearchService implements IService<AlbumObjectSimplified[]> {
  private token: IToken;
  private queryString: string;

  constructor(token: IToken, queryString: string) {
    this.token = token
    this.queryString = queryString
  }

  async get(): Promise<AlbumObjectSimplified[]> {
    const res = await fetch(`https://api.spotify.com/v1/search?q=${this.queryString}e&type=album`, {
      headers: {
        "Authorization": `Bearer ${this.token.access_token}`
      }
    })

    const albumData = await res.json();

    if(albumData.hasOwnProperty("error")) {
      throw new Error(JSON.stringify((albumData as ICodaErrorObject)))
    }

    return albumData as AlbumObjectSimplified[];
  }
}
