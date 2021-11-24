import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import { paramMissingError, ResponseStatus } from '../shared/constants';
import UserModel from '../models/user/UserModel';

const { BAD_REQUEST, OK } = StatusCodes;

export const userControllers = {
  getAllUsers: async (req: Request, res: Response) => {
    const per_page = 10;
    let page = 1;
    if (
      typeof req?.query?.page === "string" &&
      Number.parseInt(req?.query?.page)
    ) {
      page = Number.parseInt(req.query.page);
    }
    try {
      // const users = await UserModel.find().populate('markers');
      const model = UserModel;
      const usersItems = await model
        .find()
        .limit(per_page)
        .skip(per_page * (page - 1));
      const usersItemsCount = await model.countDocuments().exec();

      const pager = {
        count: usersItems.length,
        total: usersItemsCount,
        per_page,
        page: page,
        pages: Math.ceil(usersItemsCount / per_page),
      };

      return res.status(OK).json({
        status: "success",
        data: usersItems,
        meta: {
          pager,
        },
      });

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
  getUserByEmail: async (req: Request, res: Response) => {
    try {
      const { email } = req.params;

      if (!email) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError,
        });
      }

      const user = await UserModel.findOne({
        email: String(email).toLowerCase(),
      }).populate('markers');

      if (!user) {
        return res.status(400).json({
          status: ResponseStatus.FAILED,
          error: {
            code: 400,
            message: 'User not found',
          },
        });
      }

      return res
        .status(OK)
        .json({ status: ResponseStatus.SUCCESS, data: { user } });
    } catch (error) {
      res.status(500).json({ status: ResponseStatus.FAILED, error });
    }
  },
  getUserByUsername: async (req: Request, res: Response) => {
    try {
      const { username } = req.params;

      if (!username) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError,
        });
      }

      const user = await UserModel.findOne({
        username: String(username),
      }).populate('markers');

      if (!user) {
        return res.status(400).json({
          status: ResponseStatus.FAILED,
          error: {
            code: 400,
            message: 'User not found',
          },
        });
      }

      return res
        .status(OK)
        .json({ status: ResponseStatus.SUCCESS, data: { user } });
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
  update: async (req: Request, res: Response) => {
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
  delete: async (req: Request, res: Response) => {
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
