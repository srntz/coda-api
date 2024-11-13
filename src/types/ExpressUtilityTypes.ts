import {NextFunction, Request, Response} from "express";

export type ExpressRequestCallback = ((req: Request, res: Response) => void) |
                                      ((req: Request, res: Response) => Promise<void>);

export type ExpressMiddlewareCallback = ((req: Request, res: Response, next: NextFunction) => void) |
                                        ((req: Request, res: Response, next: NextFunction) => Promise<void>);
