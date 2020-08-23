import * as express from 'express';
import { ConfigFlags } from '../../config/configFlags';

export default (configFlags: ConfigFlags) => (
  req: express.Request, res: express.Response,
): void => {
  res.clearCookie(
    'userId',
    {
      expires: new Date(Date.now()),
      sameSite: 'none',
      httpOnly: true,
      secure: configFlags.isSecure,
    },
  );
  res.json({
    status: 'Logged out successfully!',
  });
};
