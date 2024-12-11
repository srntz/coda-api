import {IToken} from "../interfaces/IToken.js";
import jwt from "jsonwebtoken";
import {ICodaErrorObject} from "../types/SpotifyApiUtilityTypes.js";

export class SpotifyToken {
  private token: IToken;

  constructor(encryptedToken: string) {
    console.log(this.token)
    try {
      this.token = jwt.verify(encryptedToken, process.env.CODA_JWT_SIGNATURE) as IToken;
    } catch (e) {
      const error: ICodaErrorObject = {
        error: {
          status: 401,
          message: "You are not authorized to access this endpoint."
        },
      }
      throw new Error(JSON.stringify(error))
    }
  }

  getToken() {
    return this.token;
  }
}
