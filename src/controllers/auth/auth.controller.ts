import {IController} from "../../interfaces/IController.js";
import express from "express";
import {ExpressRequestCallback} from "../../types/ExpressUtilityTypes.js";
import {IToken} from "../../interfaces/IToken.js";
import jwt from "jsonwebtoken";

export class AuthController implements IController {
  private router: express.Router;

  constructor() {
    this.router = express.Router();

    this.router.get("/auth", this.Authenticate)
  }

  getRouter(): express.Router {
    return this.router;
  }

  private Authenticate: ExpressRequestCallback = async (req: express.Request, res: express.Response) => {
    let parsedToken: IToken;
    const cookies = {...req.cookies};

    if(!cookies.hasOwnProperty("spotifyToken")) {
      try {
        const fetchedToken = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `grant_type=client_credentials&client_id=${process.env.CODA_SPOTIFY_CLIENT_ID}&client_secret=${process.env.CODA_SPOTIFY_CLIENT_SECRET}`
        })

        parsedToken = await fetchedToken.json();

      } catch(e) {
        parsedToken = {
          error: "token_request_failed"
        }
      }

      if(!parsedToken.hasOwnProperty("error")) {
        const encryptedToken = jwt.sign(parsedToken, process.env.CODA_JWT_SIGNATURE)
        res.cookie("spotifyToken", encryptedToken, { maxAge: parsedToken.expires_in * 1000, httpOnly: true });
        res.clearCookie("spotifyTokenError");
      } else {
        res.cookie("spotifyTokenError", parsedToken.error)
        res.status(401).send()
      }
    }

    res.status(200).send()
  }
}
