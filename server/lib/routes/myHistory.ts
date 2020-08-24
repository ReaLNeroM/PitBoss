import * as express from 'express';
import DB from '../db/db';
import DBRequest from '../model/dbRequest';
import PublicRequest from '../model/publicRequest';
import HttpException from '../exceptions/HttpException';

export default (db: DB) => (
  req: express.Request, res: express.Response, next: express.NextFunction,
): void => {
  const userId = res.locals.sessionDetails.userId;

  db.getRequestsDeliveredById(userId)
    .then((myDeliveriesOrError: (Array<PublicRequest> | Error)) => {
      if(myDeliveriesOrError instanceof Error){
        const error = myDeliveriesOrError as Error;

        return next(new HttpException(500, error.message));
      }

      const myDeliveries = myDeliveriesOrError as Array<PublicRequest>;

      db.getRequestsFromId(userId)
        .then((myRequestsOrError: (Array<DBRequest> | Error)) => {
          if (myRequestsOrError instanceof Error) {
            const error = myRequestsOrError as Error;

            return next(new HttpException(500, error.message));
          }

          const myRequests = myRequestsOrError as Array<DBRequest>;

          res.json({
            myRequests: myRequests,
            myDeliveries: myDeliveries
          });
        });
    })
};
