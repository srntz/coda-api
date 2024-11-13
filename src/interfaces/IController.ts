import {Router} from "express";
import {ExpressRequestCallback} from "../types/ExpressUtilityTypes.js";

export interface IController {
  getRouter(): Router;
}

export interface IGetRequestController extends IController {
  assignGetRequestCallback(route: string, callback: ExpressRequestCallback): void;
}

export interface IMiddlewareController extends IController {
  assignMiddleware(callback: ExpressRequestCallback): void;
}

export interface IOmniController extends IGetRequestController {}
