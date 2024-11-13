import express, {Router} from "express"
import {IGetRequestController} from "../../interfaces/IController.js";
import {ExpressRequestCallback} from "../../types/ExpressUtilityTypes.js";
import {getAccessTokenEndpoint} from "./getAccessToken.endpoint.js";

export class AccessTokenController implements IGetRequestController {
  private controllerRouter: Router;

  constructor() {
    this.controllerRouter = express.Router();

    this.assignGetRequestCallback("/access-token", getAccessTokenEndpoint);
  }

  assignGetRequestCallback(route: string, callback: ExpressRequestCallback): void {
    this.controllerRouter.get(route, callback);
  }

  getRouter() {
    return this.controllerRouter;
  }
}
