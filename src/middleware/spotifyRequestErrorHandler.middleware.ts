import {ExpressErrorHandlingMiddlewareCallback} from "../types/ExpressUtilityTypes.js";
import {ISpotifyFullErrorObject} from "../types/SpotifyApiUtilityTypes.js";
import {ISendableError} from "../types/CodaApiTypes.js";

/**
 * Handles errors related to failed Spotify API requests.
 * @param err Error message. Should be a stringified object of type {"error": ErrorObject}
 */
export const spotifyRequestErrorHandler: ExpressErrorHandlingMiddlewareCallback = (err, req, res, next) => {
  const errorObject: ISpotifyFullErrorObject = JSON.parse(err);

  const apiErrorObject: ISendableError = {
    message: errorObject.error.message,
  }

  res.status(errorObject.error.status).send(apiErrorObject);
}
