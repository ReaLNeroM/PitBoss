import * as express from 'express';

export const startSessionRoute = (req: express.Request, res: express.Response): void => {
  res.json(res.locals.sessionDetails);
};

export default startSessionRoute;
