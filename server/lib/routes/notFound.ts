import * as express from 'express';
import HttpException from '../exceptions/HttpException';

export default (req: express.Request, res: express.Response, next: express.NextFunction): void => next(new HttpException(404, 'Not Found'));
