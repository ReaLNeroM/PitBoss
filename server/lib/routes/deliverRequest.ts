import * as express from 'express';
import DB from '../db/db';
import DBRequest from '../model/dbRequest';
import RequestStatus from '../model/requestStatus';
import DeliveryOffer, { validateDeliveryOffer } from '../model/deliveryOffer';
import HttpException from '../exceptions/HttpException';
import DBAccount from '../model/dbAccount';

export default (db: DB) => (
  req: express.Request, res: express.Response, next: express.NextFunction,
): void => {
  const offer = req.body as DeliveryOffer;

  if (!validateDeliveryOffer(req.body as DeliveryOffer)) {
    return next(new HttpException(422, 'Form doesn\'t have correct format.'));
  }

  // TODO(maksimovski): only one delivery at a time.

  db
    .getRequestById(offer.requestId).then((requestOrError: DBRequest | Error) => {
      if(requestOrError instanceof Error){
        const error = requestOrError as Error;
        return next(new HttpException(500, error.message));
      }

      const dbRequest = requestOrError as DBRequest;
      if(dbRequest.status !== RequestStatus.Requested){
        return next(new HttpException(403, 'Request is already taken.'));
      }
      if(dbRequest.sender === res.locals.sessionDetails.userId){
        return next(new HttpException(403, 'This is your own request.'));
      }
      db.findUserById(dbRequest.sender).then((accountOrError: DBAccount | Error) => {
        if(accountOrError instanceof Error){
          const error = accountOrError as Error;
          return next(new HttpException(500, error.message));
        }

        const account: DBAccount = accountOrError as DBAccount;
        const newRequest: DBRequest = {
          schemaVersion: dbRequest.schemaVersion,
          requestId: dbRequest.requestId,
          sender: dbRequest.sender,
          foodStation: dbRequest.foodStation,
          orderNumber: dbRequest.orderNumber,
          created: dbRequest.created,
          status: RequestStatus.Delivering,
          deliverer: res.locals.sessionDetails.userId
        }

        db.updateRequest(newRequest)
          .then((data: Error | undefined) => {
            if(data instanceof Error){
              const error = data as Error;
              return next(new HttpException(500, error.message));
            }

            res.json({
              deliveryInfo: {
                foodStation: dbRequest.foodStation,
                orderNumber: dbRequest.orderNumber,
                created: dbRequest.created,
                fullName: account.fullName,
                dormAndRoom: account.dormAndRoom,
                email: account.email,
              },
              message: 'Thanks for delivering!',
            });
          });
      })
    });

};
