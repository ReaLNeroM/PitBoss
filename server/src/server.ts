import { isUndefined } from 'util';
import express = require('express');

const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const monk = require('monk');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');
const Ajv = require('ajv');

const db = monk(process.env.MONGO_URI);
const requests = db.get('requests');
const accounts = db.get('accounts');

const registrationSchema = require('./schema/registration.json');
const requestSchema = require('./schema/request.json');
const loginSchema = require('./schema/login.json');

const app = express();

interface optionJSON {
    origin: string,
    isSecure: boolean,
    printStack: boolean
}

function devOrProductionOptions(): optionJSON {
    if(process.env.DEV === "dev"){
        return {
            origin: "http://localhost:3000",
            isSecure: false,
            printStack: true
        };
    } else {
        return {
            origin: "https://realnerom.github.io",
            isSecure: true,
            printStack: false
        };
    }
}

const options = devOrProductionOptions();
app.use(cookieParser());
app.use(cors({
    origin: options.origin,
    credentials: true
}));
const SALT_ROUNDS = 10;

app.use(express.json());

interface RequestJSON {
  fullName: string,
  dormAndRoom: string,
  email: string,
  foodStation: string,
  orderNumber: string
}

interface PublicRequestJSON {
  requestId: string,
  foodStation: string,
  created: Date,
  isOpen: boolean
}

interface RegistrationJSON {
  schemaVersion: string,
  fullName: string,
  dormAndRoom: string,
  email: string,
  password: string
  hasAllergy: boolean,
  allergies?: string
}

interface LoginJSON {
  email: string,
  password: string
}

interface DBAccount {
  schemaVersion: string,
  userId: string,
  fullName: string,
  dormAndRoom: string,
  email: string,
  hashedPassword: string
  hasAllergy: boolean,
  allergies?: string
}

interface DBRequest {
  schemaVersion: string,
  requestId: string,
  fullName: string,
  dormAndRoom: string,
  email: string,
  foodStation: string,
  orderNumber: string,
  created: Date,
  status: string,
  deliverer?: string
}

function validateRequest(json: RequestJSON): boolean {
  const ajv = new Ajv();

  return ajv.validate(requestSchema, json) && json.fullName.toString().trim() !== ''
         && json.dormAndRoom.toString().trim() !== ''
         && json.email.toString().trim() !== ''
         && json.foodStation.toString().trim() !== ''
         && json.orderNumber.toString().trim() !== '';
}

function validateRegistration(json: RegistrationJSON): boolean {
  const ajv = new Ajv();

  return ajv.validate(registrationSchema, json)
         && json.schemaVersion.toString().trim() !== ''
         && json.fullName.toString().trim() !== ''
         && json.dormAndRoom.toString().trim() !== ''
         && json.email.toString().trim() !== ''
         && json.password.toString() !== '' && json.password.toString().length > 6;
}

function validateLogin(json: LoginJSON): boolean {
  const ajv = new Ajv();

  return ajv.validate(loginSchema, json) && json.email.toString().trim() !== ''
         && json.password.toString() !== '' && json.password.toString().length > 6;
}

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('hello');
});

app.get('/requests', (req: express.Request, res: express.Response) => {
  requests
    .find()
    .then((obtainedRequests: Array<DBRequest>) => {
      const publicRequests: Array<PublicRequestJSON> = obtainedRequests
        .map((r: DBRequest) => {
          const publicRequest: PublicRequestJSON = {
            requestId: r.requestId,
            foodStation: r.foodStation,
            created: r.created,
            isOpen: (r.status === 'requested'),
          } as PublicRequestJSON;

          return publicRequest;
        });
      res.send(publicRequests);
    });
});

app.post('/create_request', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!validateRequest(req.body)) {
    res.status(422);
    next(new Error(
      'Form doesn\'t have correct format.',
    ));
  }

  const request: DBRequest = {
    schemaVersion: req.body.schemaVersion.toString().trim(),
    requestId: uuidv4(),
    fullName: req.body.fullName.toString().trim(),
    dormAndRoom: req.body.dormAndRoom.toString().trim(),
    email: req.body.email.toString().trim(),
    foodStation: req.body.foodStation.toString().trim(),
    orderNumber: req.body.orderNumber.toString().trim(),
    created: new Date(),
    status: 'requested',
  };

  requests
    .insert(request)
    .then((response: RequestJSON) => {
      res.send(response);
    });
});

function login(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  loginJson: LoginJSON,
): void {
  if (!validateLogin(loginJson)) {
    res.status(400);
    next(new Error(
      'Something went wrong with the login form. Please correct the form and try again.',
    ));
  }

  accounts
    .find({ email: loginJson.email })
    .then((matchingAccounts: Array<DBAccount>) => {
      if (matchingAccounts.length === 0) {
        res.status(401);
        next(new Error('Email or password is incorrect.'));
      }
      if (matchingAccounts.length !== 1) {
        res.status(500);
        next(new Error(
          'More than one account with the given email. Please report this bug.',
        ));
      }

      const accountData: DBAccount = matchingAccounts[0];
      bcrypt
        .compare(loginJson.password, accountData.hashedPassword)
        .then((authenticated: boolean) => {
          if (!authenticated) {
            res.status(401);
            next(new Error(
              'Email or password is incorrect.',
            ));
          }

          try {
            const token: JsonWebKey = jwt.sign({
              userId: accountData.userId,
            }, process.env.TOKEN_SECRET, { expiresIn: '30 days' });

            res.cookie('userId', token, {
              expires: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
              sameSite: 'none',
              httpOnly: true,
              secure: options.isSecure,
            });

            res.json({
              userId: accountData.userId,
              status: 'Logged in successfully!',
            });
          } catch (err) {
            next(err);
          }
        });
    });
}

app.post('/auth/register', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const registrationJson = req.body as RegistrationJSON;

  if (!validateRegistration(registrationJson)) {
    res.status(400);
    next(new Error(
      'Something went wrong with the registration form. Please correct the form and try again.',
    ));
  }

  const password = registrationJson.password.toString();
  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
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

  accounts
    .find({ email: accountData.email })
    .then((matchingAccounts: Array<DBAccount>) => {
      if (matchingAccounts.length === 0) {
        accounts
          .insert(accountData)
          .then(() => {
            // TODO(maksimovski): verify account via email.
            login(req, res, next, registrationJson as LoginJSON);
          });
      } else {
        res.status(409);
        next(new Error('Email already in use!'));
      }
    });
});

app.post('/auth/login', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const loginJson = req.body as LoginJSON;

  login(req, res, next, loginJson);
});

app.post('/auth/logout', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!('userId' in req.cookies)) {
    res.status(403);
    next(new Error('You\'re already logged out.'));
  }

  res.clearCookie('userId', {
    expires: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
    sameSite: 'none',
    httpOnly: true,
    secure: options.isSecure,
  });
  res.json({
    status: 'Logged out successfully!',
  });
});

app.get('/auth/cookie', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!('userId' in req.cookies)) {
    res.status(403);
    next(new Error('Not logged in.'));
    return;
  }

  try {
    const data = jwt.verify(req.cookies.userId, process.env.TOKEN_SECRET);
    res.json({
      userId: data.userId,
      status: 'Logged in successfully!',
    });
  } catch (err) {
    res.status(401);
    next(err);
  }
});

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404);
  next(new Error('Not Found'));
});

// eslint-disable-next-line
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(res.statusCode || 500);
  res.send({
    message: err.message,
    error: (options.printStack && !isUndefined(err.stack)) ? err.stack : {},
  });
});

const port: number = Number(process.env.PORT) || 6969;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
