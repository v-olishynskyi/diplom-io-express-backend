import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/user/UserModel';
import { ResponseStatus } from '../shared/constants';
import { wait } from '../shared/utils';
import createError from 'http-errors';

export const authController = {
  signIn: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email: email }).populate(
        'markers'
      );

      if (!user) {
        const error = new createError.NotFound('User not found');
        return res.status(400).json({
          status: ResponseStatus.FAILED,
          error,
        });
      }

      return res
        .status(StatusCodes.OK)
        .json({ status: ResponseStatus.SUCCESS, data: { user } });
    } catch (error) {
      res.status(400).json({ status: ResponseStatus.FAILED, error });
    }
  },
  signUp: async (req: Request, res: Response) => {
    try {
      const { email, username, name, family_name, email_verified } = req.body;

      const user = new UserModel({
        email,
        name,
        username,
        family_name,
        email_verified,
      });

      const result = await user.save();

      if (!result) {
        const error = createError(500, 'Register failed');

        return res.status(500).json({
          status: ResponseStatus.FAILED,
          error: {
            code: 500,
            message: 'Register failed',
            trace: this,
          },
        });
      }
      return res.status(StatusCodes.OK).json({ success: true, data: result });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
  signOut: async (req: Request, res: Response) => {
    // do something...
    await wait(500);
    return res.status(StatusCodes.OK);
  },
};
