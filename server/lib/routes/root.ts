import * as express from 'express';

export default (req: express.Request, res: express.Response): void => {
  res.json({
    message: 'hello',
  });
};
