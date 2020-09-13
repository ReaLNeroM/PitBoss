import * as express from 'express';
import DB from '../db/db';
import { tempMyDelivery, tempMyRequest, tempHistoryEntry } from '../model/historyEntry';
import HttpException from '../exceptions/HttpException';

export default (db: DB) => (
  req: express.Request, res: express.Response, next: express.NextFunction,
): void => {
  const userId = res.locals.sessionDetails.userId;

  db.getDeliveriesFromUser(userId)
    .then((deliveriesOrError: Array<tempMyDelivery> | Error) => {
      if (deliveriesOrError instanceof Error) {
        const error = deliveriesOrError as Error;
        return next(new HttpException(500, error.message));
      }
      const deliveries = deliveriesOrError as Array<tempMyDelivery>;

      return db.getRequestsFromUser(userId)
        .then((requestsOrError: Array<tempMyRequest> | Error) => {
          if (requestsOrError instanceof Error) {
            const error = requestsOrError as Error;
            return next(new HttpException(500, error.message));
          }
          const requests = requestsOrError as Array<tempMyRequest>;

          const combinedHistory: Array<tempHistoryEntry> = requests.concat(deliveries);
          combinedHistory.sort((a: tempHistoryEntry, b: tempHistoryEntry) => {
            const aDate = a.request.lastUpdate;
            const bDate = b.request.lastUpdate;
            if (aDate < bDate) {
              return -1;
            } else if (aDate > bDate) {
              return 1;
            } else {
              return 0;
            }
          });

          return res.json({
            history: combinedHistory,
          });
        });
    });
};
