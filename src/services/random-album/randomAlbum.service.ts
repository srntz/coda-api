import {IService} from "../../interfaces/IService.js";
import playlists from "../../data/playlists.js";
import {IToken} from "../../interfaces/IToken.js";
import PlaylistObjectFull = SpotifyApi.PlaylistObjectFull;
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;
import {ISpotifyFullErrorObject} from "../../types/SpotifyApiUtilityTypes.js";
import AlbumObjectSimplified = SpotifyApi.AlbumObjectSimplified;

// The number of playlists processed in one generation cycle
const PLAYLIST_COUNT = 5;

// The amount of albums that the service returns per call
const RETURN_ALBUM_COUNT = 5;

// The allowed number of generation iterations before a timeout error gets thrown
const ALLOWED_GENERATION_ATTEMPTS = 3;

export class RandomAlbumService implements IService<AlbumObjectSimplified[]> {
  private playlistArray: string[];
  private chosenPlaylists: string[] = [];
  private token: IToken
  private tracks: PlaylistTrackObject[] = [];
  private albums: AlbumObjectSimplified[] = [];

  constructor(token: IToken) {
    this.token = token;
  }

  /**
   * Generates a list of recommended albums based on randomly selected playlist ids
   * @returns List of selected albums
   */
  async get(): Promise<AlbumObjectSimplified[]> {
    const generationAttempts = 0;
    while(this.albums.length < RETURN_ALBUM_COUNT && generationAttempts <= ALLOWED_GENERATION_ATTEMPTS) {
      await this.constructAlbumsArray()
    }

    if(this.albums.length < RETURN_ALBUM_COUNT) {
      const error: ISpotifyFullErrorObject = {
        error: {
          status: 408,
          message: "Generation timed out.",
        }
      }

      throw new Error(JSON.stringify(error))
    }

    return this.albums;
  }

  /**
   * A wrapper on the entire generation logic. Performs calls to functions that
   * choose playlist ids, construct the tracks array and fill the albums array.
   * @private
   */
  private async constructAlbumsArray() {
    this.determinePlaylistIds()

    for (const id of this.chosenPlaylists) {
      const playlistData = await this.fetchPlaylistData(id)
      this.tracks.push(...playlistData.tracks.items)
    }

    this.inferAlbumsFromTracks()
  }

  /**
   * Iterates through the playlistArray and randomly adds entries to the chosenPlaylists
   * deleting them from playlistArray to counter repetition.
   * @private
   */
  private determinePlaylistIds() {
    this.playlistArray = [...playlists]
    this.chosenPlaylists = [];

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

  /**
   * Fills the albums array from randomly selected tracks.
   * @private
   */
  private inferAlbumsFromTracks() {
    while(this.albums.length < RETURN_ALBUM_COUNT && this.tracks.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.tracks.length)
      const currentTrack = this.tracks[randomIndex].track;
      const selectedAlbumsIds = this.albums.map(item => item.id);

      // Add an album to the selected albums array if album_type is "album" and it does not already exist in the selected albums array
      if(currentTrack.album.album_type === "album" && !selectedAlbumsIds.includes(currentTrack.album.id)) {
        this.albums.push(currentTrack.album);
        this.tracks.splice(randomIndex, 1);
      }
    }
  }
}
