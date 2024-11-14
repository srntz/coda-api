import {IToken} from "../interfaces/IToken.js";
import jwt from "jsonwebtoken";

export class SpotifyToken {
  private token: IToken;

  constructor(encryptedToken: string) {
    this.token = jwt.verify(encryptedToken, process.env.CODA_JWT_SIGNATURE) as IToken;
  }

  getToken() {
    return this.token;
  }
}
