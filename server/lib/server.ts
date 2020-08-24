import { isUndefined } from 'util';
import express = require('express');

import authenticatedMiddleware from './middleware/auth';
import { ConfigFlags, devOrProductionFlags } from './config/configFlags';
import notAuthenticatedMiddleware from './middleware/noAuth';
import DB from './db/db';
import getRequestsRoute from './routes/getRequests';
import loginRoute from './routes/auth/login';
import createRequestRoute from './routes/createRequest';
import registerRoute from './routes/auth/register';
import logoutRoute from './routes/auth/logout';
import startSessionRoute from './routes/auth/startSession';
import MongoDB from './db/mongoDb';
import NotFoundRoute from './routes/notFound';
import rootRoute from './routes/root';
import HttpException from './exceptions/HttpException';
import deliverRequestRoute from './routes/deliverRequest';
import myHistoryRoute from './routes/myHistory';

const cors = require('cors');
const monk = require('monk');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const db: DB = new MongoDB(monk(process.env.MONGO_URI)) as DB;

const configFlags: ConfigFlags = devOrProductionFlags();

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: configFlags.origin,
  credentials: true
}));

app.get('/', rootRoute);
app.get('/get-requests', getRequestsRoute(db));
app.post('/create-request', authenticatedMiddleware(db), createRequestRoute(db));
app.post('/deliver-request', authenticatedMiddleware(db), deliverRequestRoute(db));
app.get('/my-history', authenticatedMiddleware(db), myHistoryRoute(db));
app.post('/auth/login', notAuthenticatedMiddleware(db), loginRoute(db, configFlags));
app.post('/auth/register', notAuthenticatedMiddleware(db), registerRoute(db, configFlags));
app.post('/auth/logout', authenticatedMiddleware(db), logoutRoute(configFlags));
app.get('/auth/start-session', authenticatedMiddleware(db), startSessionRoute);
app.use(NotFoundRoute);

// eslint-disable-next-line
app.use((err: HttpException, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || res.statusCode || 500);
  res.json({
    message: err.message,
    error: (configFlags.printStack && !isUndefined(err.stack)) ? err.stack : {},
  });
});


const port: number = Number(process.env.PORT) || 6969;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
