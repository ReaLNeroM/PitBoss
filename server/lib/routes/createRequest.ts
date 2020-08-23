import * as express from 'express';
import { v4 as uuidv4 } from 'uuid';
import DB from '../db/db';
import DBRequest from '../model/dbRequest';
import Request, { validateRequest } from '../model/request';
import HttpException from '../exceptions/HttpException';

export default (db: DB) => (
  req: express.Request, res: express.Response, next: express.NextFunction,
): void => {
  const request = req.body as Request;

  if (!validateRequest(req.body as Request)) {
    next(new HttpException(422, 'Form doesn\'t have correct format.'));
  }

  const dbRequest: DBRequest = {
    schemaVersion: request.schemaVersion.toString().trim(),
    requestId: uuidv4(),
    sender: res.locals.sessionDetails.userId,
    foodStation: request.foodStation.toString().trim(),
    orderNumber: request.orderNumber.toString().trim(),
    created: new Date(),
    status: 'requested',
  };

  db.insertRequest(dbRequest)
    .then(data => {
      res.json({
        message: 'Request submitted successfully!',
      });
    });
};
