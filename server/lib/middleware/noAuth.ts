import * as express from 'express';
import jwt from 'jsonwebtoken';
import AuthToken from '../model/authToken';
import DB from '../db/db';
import HttpException from '../exceptions/HttpException';

export default (db: DB) => (
  req: express.Request, res: express.Response, next: express.NextFunction,
): void => {
  if (!('userId' in req.cookies)) {
    res.locals.isAuthenticated = false;
    return next();
  }

  const jwtToken = req.cookies.userId;

  if (process.env.TOKEN_SECRET === null) {
    return next(new HttpException(500, 'Secret not defined.'));
  }

  try {
    const data: AuthToken = jwt.verify(
      jwtToken,
      process.env.TOKEN_SECRET as string,
    ) as AuthToken;

    db.findUserById(data.userId)
      .then((maybeData) => {
        if (maybeData === undefined) {
          return next(new HttpException(400, 'No such user.'));
        }

        res.locals.isAuthenticated = true;
        return next(new HttpException(401, 'Already logged in.'));
      });
  } catch (error) {
    // If the signature is incorrect or it's expired, we want to remove
    // the cookie.
    console.log(`Info: ${error.message}`);
    return next();
  }
};
