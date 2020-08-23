import * as express from 'express';
import DB from '../db/db';
import DBRequest from '../model/dbRequest';
import PublicRequest from '../model/publicRequest';
import HttpException from '../exceptions/HttpException';

export default (db: DB) => (
  req: express.Request, res: express.Response, next: express.NextFunction,
): void => {
  db.getRequests()
    .then((requestsOrError: (Array<DBRequest> | Error)) => {
      if (requestsOrError instanceof Error) {
        const error = requestsOrError as Error;

        next(new HttpException(500, error.message));
      }

      const requests = requestsOrError as Array<DBRequest>;
      const publicRequests: Array<PublicRequest> = requests
        .map((r: DBRequest) => {
          const publicRequest: PublicRequest = {
            requestId: r.requestId,
            foodStation: r.foodStation,
            created: r.created,
            isOpen: r.status === 'requested',
          } as PublicRequest;

          return publicRequest;
        });

      res.send(publicRequests);
    });
};
