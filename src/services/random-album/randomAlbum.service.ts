import {IService} from "../../interfaces/IService.js";
import AlbumObjectFull = SpotifyApi.AlbumObjectFull;
import playlists from "../../data/playlists.js";
import {IToken} from "../../interfaces/IToken.js";
import PlaylistObjectFull = SpotifyApi.PlaylistObjectFull;
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import {ISpotifyFullErrorObject} from "../../types/SpotifyApiUtilityTypes.js";

const PLAYLIST_COUNT = 5;

export class RandomAlbumService implements IService<AlbumObjectFull> {
  private playlistArray: string[];
  private chosenPlaylists: string[] = [];
  private token: IToken
  private tracks: PlaylistTrackObject[] = [];

  constructor(token: IToken) {
    this.token = token;
    this.playlistArray = [...playlists]
    this.determinePlaylistIds()
  }

  /**
   * Generates a list of recommended albums based on randomly selected playlist ids
   * @returns List of selected albums
   */
  async get(): Promise<AlbumObjectFull> {
    for (const id of this.chosenPlaylists) {
      const playlistData = await this.fetchPlaylistData(id)
      this.tracks.push(...playlistData.tracks.items)
    }

    this.tracks.forEach(track => {
      console.log(track.track.name)
    })

    return Promise.resolve(undefined);
  }

  /**
   * Iterates through the playlistArray and randomly adds entries to the chosenPlaylists
   * deleting them from playlistArray to counter repetition.
   * @private
   */
  private determinePlaylistIds() {
    for (let i = 0; i < PLAYLIST_COUNT; i++) {
      const randomIndex = Math.floor(Math.random() * this.playlistArray.length);
      this.chosenPlaylists.push(this.playlistArray[randomIndex]);
      this.playlistArray.splice(randomIndex, 1);
    }
  }

  /**
   * Fetches data from the Spotify API /playlists endpoint
   * @param id playlist ID
   * @private
   * @returns playlist object
   * @throws Error if the playlist request failed
   */
  private async fetchPlaylistData(id: string): Promise<PlaylistObjectFull> {
    const res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: {
        "Authorization": `Bearer ${this.token.access_token}`,
      }
    })

    const playlistData: object = await res.json();

    if(playlistData.hasOwnProperty("error")) {
      throw new Error(JSON.stringify((playlistData as ISpotifyFullErrorObject)))
    }

    return playlistData as PlaylistObjectFull;
  }
}
