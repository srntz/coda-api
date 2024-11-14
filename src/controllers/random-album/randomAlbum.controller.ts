import {IGetRequestController} from "../../interfaces/IController.js";
import express from "express";
import {ExpressRequestCallback} from "../../types/ExpressUtilityTypes.js";
import {GetRandomAlbum} from "./randomAlbum.endpoint.js";

export class RandomAlbumController implements IGetRequestController{
  private router = express.Router();

  constructor() {
    this.assignGetRequestCallback("/random-album", GetRandomAlbum)
  }

  assignGetRequestCallback(route: string, callback: ExpressRequestCallback) {
    this.router.get(route, callback);
  }

  getRouter() {
    return this.router
  }
}
