import express = require('express');

const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const monk = require('monk');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const Ajv = require('ajv');

const db = monk(process.env.MONGO_URI || 'localhost/pitboss');
const requests = db.get('requests');
const accounts = db.get('accounts');

const registrationSchema = require('../schema/registration.json');
const requestSchema = require('../schema/request.json');
const loginSchema = require('../schema/login.json');

const app = express();

const SALT_ROUNDS = 10;

app.use(cors());
app.use(express.json());

interface RequestJSON {
  fullName: string,
  dormAndRoom: string,
  email: string,
  foodStation: string,
  orderNumber: string
}

interface RegistrationJSON {
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

interface ResponseJSON {
  result: string
}

interface DBAccount {
  userId: string,
  fullName: string,
  dormAndRoom: string,
  email: string,
  hashedPassword: string
  hasAllergy: boolean,
  allergies?: string
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

  return ajv.validate(registrationSchema, json) && json.fullName.toString().trim() !== ''
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
    .then((obtainedRequests: Array<RequestJSON>) => {
      res.send(obtainedRequests);
    });
});

app.post('/create_request', (req: express.Request, res: express.Response) => {
  if (validateRequest(req.body)) {
    const request = {
      schemaVersion: req.body.schemaVersion.toString().trim(),
      fullName: req.body.fullName.toString().trim(),
      dormAndRoom: req.body.dormAndRoom.toString().trim(),
      email: req.body.email.toString().trim(),
      foodStation: req.body.foodStation.toString().trim(),
      orderNumber: req.body.orderNumber.toString().trim(),
      created: new Date(),
    };

    requests
      .insert(request)
      .then((response : RequestJSON) => {
        res.send(response);
      });
  } else {
    res.status(422);
    res.json({
      message: 'Form doesn\'t have correct format.',
    });
  }
});

function login(req: express.Request, res: express.Response, loginJson: LoginJSON): void {
  if (!validateLogin(loginJson)) {
    res.status(401);
    res.json({
      message: 'Authentication error (fields were incorrect).',
    });
  } else {
    accounts
      .find({ email: loginJson.email })
      .then((matchingAccounts: Array<DBAccount>) => {
        if (matchingAccounts.length === 0) {
          res.json({
            status: 'Email or password is incorrect.',
          });
        } else if (matchingAccounts.length === 1) {
          const accountData: DBAccount = matchingAccounts[0];
          bcrypt
            .compare(loginJson.password, accountData.hashedPassword)
            .then((authenticated: boolean) => {
              if (authenticated) {
                jwt.sign({
                  userId: accountData.userId,
                }, process.env.TOKEN_SECRET, { expiresIn: '30 days' }, (err: Error, token: JsonWebKey) => {
                  res.cookie('userId', token, {
                    expires: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                    secure: true,
                  });

                  res.json({
                    userId: accountData.userId,
                    status: 'Logged in successfully!',
                  });
                });
              } else {
                res.json({
                  status: 'Email or password is incorrect.',
                });
              }
            });
        } else {
          res.json({
            status: 'More than one account with the given email. Please report this bug.',
          });
        }
      });
  }
}

app.post('/auth/register', (req: express.Request, res: express.Response) => {
  const registrationJson = req.body as RegistrationJSON;

  if (!validateRegistration(registrationJson)) {
    res.status(422);
    res.json({
      message: 'Registration error (fields were incorrect).',
    });
  } else {
    const password = registrationJson.password.toString();
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
    const accountData: DBAccount = {
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
              res.json({ status: 'Account created successfully.' });
              // TODO(maksimovski): verify account via email.
              return login(req, res, registrationJson as LoginJSON);
            });
        } else {
          res.json({ status: 'Email already in use!' });
        }
      });
  }
});

app.post('/auth/login', (req: express.Request, res: express.Response) => {
  const loginJson = req.body as LoginJSON;

  return login(req, res, loginJson);
});

const port: number = Number(process.env.PORT) || 6969;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
