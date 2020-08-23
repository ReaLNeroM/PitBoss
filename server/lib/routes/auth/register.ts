import * as express from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import DBAccount from '../../model/dbAccount';
import DB from '../../db/db';
import Login from '../../model/login';
import { login } from './login';
import { ConfigFlags } from '../../config/configFlags';
import Registration, { validateRegistration } from '../../model/registration';
import HttpException from '../../exceptions/HttpException';

const SALT_ROUNDS = 10;

export default (db: DB, configFlags: ConfigFlags) => (
  req: express.Request, res: express.Response, next: express.NextFunction,
): void => {
  const registrationJson = req.body as Registration;

  if (!validateRegistration(registrationJson)) {
    next(new HttpException(400, 'Something went wrong with the registration form. Please correct the form and try again.'));
  }

  const password = registrationJson.password.toString();
  const hashedPassword = bcrypt.hashSync(
    password,
    SALT_ROUNDS,
  );
  const accountData: DBAccount = {
    schemaVersion: registrationJson.schemaVersion,
    userId: uuidv4(),
    fullName: registrationJson.fullName.trim(),
    dormAndRoom: registrationJson.dormAndRoom.trim(),
    email: registrationJson.email.trim(),
    hashedPassword,
    hasAllergy: registrationJson.hasAllergy,
    allergies: registrationJson.allergies,
  };

  db.existsUserWithEmail(accountData.email)
    .then((existsOrError: boolean | Error) => {
      if (existsOrError instanceof Error) {
        const error = existsOrError as Error;

        next(new HttpException(500, error.message));
      }

      const exists: boolean = existsOrError as boolean;

      if (exists) {
        next(new HttpException(409, 'Email already in use!'));
      }

      db.insertAccount(accountData)
        .then(() => {
          // TODO(maksimovski): verify account via email.
          login(
            req,
            res,
            next,
            registrationJson as Login,
            db,
            configFlags,
          );
        });
    });
};
