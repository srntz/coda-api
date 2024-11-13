import {Request, Response} from "express";
import {ExpressRequestCallback} from "../../types/ExpressUtilityTypes.js";

export const getAccessTokenEndpoint: ExpressRequestCallback = async (req: Request, res: Response) => {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `grant_type=client_credentials&client_id=${process.env.CODA_SPOTIFY_CLIENT_ID}&client_secret=${process.env.CODA_SPOTIFY_CLIENT_SECRET}`
  })

  console.log(await result.json())
}
