import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/user/UserModel';
import { paramMissingError, ResponseStatus } from '../shared/constants';
import createError from 'http-errors';

const { BAD_REQUEST, OK } = StatusCodes;

export const authController = {
  signIn: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError,
        });
      }

      const user = await UserModel.findOne({
        email: String(email).toLowerCase(),
      }).populate('markers');

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

      if (!email || !username || !name || !family_name || !email_verified) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError,
        });
      }

      const user = new UserModel({
        email: String(email).toLowerCase(),
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
      return res
        .status(StatusCodes.OK)
        .json({ status: ResponseStatus.SUCCESS, data: result });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },
  signOut: (req: Request, res: Response) => {
    return res.status(StatusCodes.OK).end();
  },
};
