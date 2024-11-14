import {IService} from "../../interfaces/IService.js";
import AlbumObjectFull = SpotifyApi.AlbumObjectFull;
import playlists from "../../data/playlists.js";
import {IToken} from "../../interfaces/IToken.js";
import PlaylistObjectFull = SpotifyApi.PlaylistObjectFull;
import PlaylistTrackObject = SpotifyApi.PlaylistTrackObject;

const PLAYLIST_COUNT = 5;

export class RandomAlbumService implements IService<AlbumObjectFull> {
  private playlistArray: string[];
  private chosenPlaylists = new Set<string>()
  private token: IToken
  private tracks: PlaylistTrackObject[] = [];

  constructor(token: IToken) {
    this.token = token;
  }

  async get(): Promise<AlbumObjectFull> {
    this.playlistArray = [...playlists]

    this.determinePlaylistIds()

    for (const id of this.chosenPlaylists) {
      const playlistData = await this.fetchPlaylistData(id)
      this.tracks.push(...playlistData.tracks.items)
    }

    this.tracks.forEach(track => {
      console.log(track.track.name)
    })

    return Promise.resolve(undefined);
  }

  private determinePlaylistIds() {
    for (let i = 0; i < PLAYLIST_COUNT; i++) {
      const randomIndex = Math.floor(Math.random() * this.playlistArray.length);
      this.chosenPlaylists.add(this.playlistArray[randomIndex]);
      this.playlistArray.splice(randomIndex, 1);
    }
  }

  private async fetchPlaylistData(id: string): Promise<PlaylistObjectFull> {
    const res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: {
        "Authorization": `Bearer ${this.token.access_token}`,
      }
    })

    const playlistData: PlaylistObjectFull = await res.json();

    return playlistData
  }
}
