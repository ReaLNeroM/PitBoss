import * as express from 'express';

export const rootRoute = (req: express.Request, res: express.Response): void => {
  res.json({
    message: 'hello',
  });
};

export default rootRoute;
