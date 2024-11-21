import {NextFunction, Request, Response} from "express";

export type ExpressRequestCallback = ((req: Request, res: Response) => void) |
                                      ((req: Request, res: Response) => Promise<void>) | ExpressMiddlewareCallback;

export type ExpressMiddlewareCallback = ((req: Request, res: Response, next: NextFunction) => void) |
                                        ((req: Request, res: Response, next: NextFunction) => Promise<void>);

export type ExpressErrorHandlingMiddlewareCallback = ((err: string, req: Request, res: Response, next: NextFunction) => void);
