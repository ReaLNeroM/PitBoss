import * as express from 'express';
import jwt from 'jsonwebtoken';
import AuthToken from '../model/authToken';
import DB from '../db/db';
import HttpException from '../exceptions/HttpException';
import DBAccount from '../model/dbAccount';
import SessionDetails from '../model/sessionDetails';
import { ConfigFlags } from '../config/configFlags';

export const authRoute = (db: DB, configFlags: ConfigFlags) => (
  req: express.Request, res: express.Response, next: express.NextFunction,
): void => {
  if (!('userId' in req.cookies)) {
    return next(new HttpException(403, 'Not logged in.'));
  }

  const jwtToken = req.cookies.userId;

  if (process.env.TOKEN_SECRET === null) {
    return next(new HttpException(500, 'JWT secret not defined.'));
  }

  try {
    const data: AuthToken = jwt.verify(
      jwtToken,
      process.env.TOKEN_SECRET as string,
    ) as AuthToken;

    db.findUserById(data.userId)
      .then((maybeData: DBAccount | Error) => {
        if (maybeData instanceof Error) {
          return next(new HttpException(400, 'No such user.'));
        }

        const account: DBAccount = maybeData as DBAccount;
        res.locals.sessionDetails = {
          userId: account.userId,
          dormAndRoom: account.dormAndRoom,
        } as SessionDetails;
        res.locals.isAuthenticated = true;
      })
      .then(() => next());
  } catch (error) {
    res.locals.isAuthenticated = false;
    res.locals.sessionDetails = null;
    res.clearCookie(
      'userId',
      {
        expires: new Date(Date.now()),
        sameSite: 'none',
        httpOnly: true,
        secure: configFlags.isSecure,
      },
    );
    return next(new HttpException(401, error.message));
  }
};

export default authRoute;
