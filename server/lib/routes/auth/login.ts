import * as express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DB from '../../db/db';
import DBAccount from '../../model/dbAccount';
import Login, { validateLogin } from '../../model/login';
import { ConfigFlags } from '../../config/configFlags';
import AuthToken from '../../model/authToken';
import HttpException from '../../exceptions/HttpException';

export const login = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  loginJson: Login,
  db: DB,
  configFlags: ConfigFlags,
): void => {
  if (res.locals.isAuthenticated) {
    return next(new HttpException(403, 'You\'re already logged in!'));
  }

  if (!validateLogin(loginJson)) {
    return next(new HttpException(400, 'Something went wrong with the login form. Please correct the form and try again.'));
  }

  db.findUserByEmail(loginJson.email)
    .then((accountOrError: DBAccount | Error) => {
      if (accountOrError instanceof Error) {
        const error = accountOrError as Error;
        return next(new HttpException(500, error.message));
      }

      const account = accountOrError as DBAccount;
      bcrypt
        .compare(
          loginJson.password,
          account.hashedPassword,
        )
        .then((authenticated: boolean) => {
          if (!authenticated) {
            return next(new HttpException(401, 'Email or password is incorrect.'));
          }

          if (process.env.TOKEN_SECRET === undefined) {
            return next(new HttpException(500, 'JWT secret not defined.'));
          }

          const authToken: AuthToken = {
            userId: account.userId,
          };

          const token: string = jwt.sign(
            authToken,
            process.env.TOKEN_SECRET as string,
            { expiresIn: '30 days' },
          );

          res.cookie(
            'userId',
            token,
            {
              expires: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000),
              sameSite: 'none',
              httpOnly: true,
              secure: configFlags.isSecure,
            },
          );

          res.json({
            userId: account.userId,
            status: 'Logged in successfully!',
          });
        });
    });
};

export const loginRoute = (db: DB, configFlags: ConfigFlags) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  const loginData = req.body as Login;

  login(
    req,
    res,
    next,
    loginData,
    db,
    configFlags,
  );
};

export default loginRoute;
