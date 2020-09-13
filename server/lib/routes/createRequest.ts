import * as express from 'express';
import { v4 as uuidv4 } from 'uuid';
import DB from '../db/db';
import DBRequest from '../model/dbRequest';
import RequestStatus from '../model/requestStatus';
import Request, { validateRequest } from '../model/request';
import HttpException from '../exceptions/HttpException';

export const createRequestRoute = (db: DB) => (
  req: express.Request, res: express.Response, next: express.NextFunction,
): void => {
  const request = req.body as Request;

  if (!validateRequest(req.body as Request)) {
    return next(new HttpException(422, 'Form doesn\'t have correct format.'));
  }

  const updateTime = new Date(Date.now());
  const dbRequest: DBRequest = {
    schemaVersion: request.schemaVersion.toString().trim(),
    requestId: uuidv4(),
    sender: res.locals.sessionDetails.userId,
    foodStation: request.foodStation.toString().trim(),
    orderNumber: request.orderNumber.toString().trim(),
    created: updateTime,
    status: RequestStatus.Requested,
    lastUpdate: updateTime,
  };

  db.insertRequest(dbRequest)
    .then((data: Error | undefined) => {
      if (data instanceof Error) {
        const error = data as Error;
        return next(new HttpException(500, error.message));
      }

      res.json({
        message: 'Request submitted successfully!',
      });
    });
};

export default createRequestRoute;
