import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import { paramMissingError, ResponseStatus } from '../shared/constants';
import UserModel from '../models/user/UserModel';

const { BAD_REQUEST, OK } = StatusCodes;

export const userControllers = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await UserModel.find().populate('markers');

      return res.status(OK).json({ users });
    } catch (error) {
      res.status(500).json({ status: ResponseStatus.FAILED, error });
    }
  },
  getUserById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError,
        });
      }

      const user = await UserModel.findById(id).populate('markers');

      if (!user) {
        return res.status(400).json({
          status: ResponseStatus.FAILED,
          error: {
            code: 400,
            message: 'User not found',
          },
        });
      }

      return res.status(OK).json({ user });
    } catch (error) {
      res.status(500).json({ status: ResponseStatus.FAILED, error });
    }
  },
  // getOneUserByFilter: async (req: Request, res: Response) => {
  //   try {
  //     const { filter } = req.query;

  //     if (!filter) {
  //       return res.status(BAD_REQUEST).json({
  //         error: paramMissingError,
  //       });
  //     }

  //     const user = await UserModel.find(filter).populate('markers');

  //     if (!user) {
  //       return res.status(400).json({
  //         status: ResponseStatus.FAILED,
  //         error: {
  //           code: 400,
  //           message: 'User not found',
  //         },
  //       });
  //     }

  //     return res.status(OK).json({ user });
  //   } catch (error) {
  //     res.status(500).json({ status: ResponseStatus.FAILED, error });
  //   }
  // },
  editUser: async (req: Request, res: Response) => {
    try {
      const { user } = req.body;

      if (!user) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError,
        });
      }

      const newUser = await UserModel.findByIdAndUpdate(
        user.id,
        { $set: user },
        { new: true, populate: 'markers' }
      );

      return res
        .status(OK)
        .json({ status: ResponseStatus.SUCCESS, data: { user: newUser } });
    } catch (error) {
      return res.status(500).json({ status: ResponseStatus.FAILED, error });
    }
  },
  deleteUserById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError,
        });
      }
      const remove = await UserModel.findByIdAndRemove(id).populate('owner');

      if (!remove) {
        return res.status(404).json({
          status: ResponseStatus.FAILED,
          error: {
            code: 400,
            message: 'User not found',
          },
        });
      }

      return res
        .status(200)
        .json({ status: ResponseStatus.SUCCESS, data: { remove } });
    } catch (error) {
      res.status(500).json({
        status: ResponseStatus.FAILED,
        error,
      });
    }
  },
};
