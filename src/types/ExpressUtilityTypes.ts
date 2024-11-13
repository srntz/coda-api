import {Request, Response} from "express";

export type ExpressRequestCallback = ((req: Request, res: Response) => void) | ((req: Request, res: Response) => Promise<void>);
