import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CategoryModel } from '../models/category/CategoryModel';
import { paramMissingError, ResponseStatus } from '../shared/constants';

const { OK, BAD_REQUEST, CREATED } = StatusCodes;

export const categoryController = {
  get: async (req: Request, res: Response) => {
    try {
      const filter = req.query;

      const categories = await CategoryModel.find(filter);

      if (!categories) {
        return res.status(404).json({
          status: ResponseStatus.FAILED,
          error: {
            code: 404,
            message: 'Categories not found',
          },
        });
      }

      return res
        .status(OK)
        .json({ status: ResponseStatus.SUCCESS, data: { categories } });
    } catch (error) {
      res.status(500).json({
        status: ResponseStatus.FAILED,
        error,
      });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const category = await CategoryModel.findById(id);

      if (!category) {
        return res.status(404).json({
          status: ResponseStatus.FAILED,
          error: {
            code: 404,
            message: 'Category not found',
          },
        });
      }

      return res
        .status(OK)
        .json({ status: ResponseStatus.SUCCESS, data: { category } });
    } catch (error) {
      res.status(500).json({
        status: ResponseStatus.FAILED,
        error,
      });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { label, value, isAccept } = req.body;

      if (!label || !value || !isAccept) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError,
        });
      }

      const category = new CategoryModel({
        label,
        value,
        isAccept,
      });

      const result = await category.save();

      return res
        .status(CREATED)
        .send({ status: 'success', data: { category: result } });
    } catch (error) {
      return res.status(500).json({ status: ResponseStatus.FAILED, error });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { label, value, isAccept } = req.body;

      if (!id) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError,
        });
      }

      const newCategory = await CategoryModel.findByIdAndUpdate(
        id,
        {
          $set: { label, value, isAccept },
        },
        { new: true }
      );

      return res
        .status(OK)
        .send({ status: 'success', data: { category: newCategory } });
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

      const category = await CategoryModel.findByIdAndRemove(id);

      return res.status(OK).send({ status: 'success', data: { category } });
    } catch (error) {
      return res.status(500).json({ status: ResponseStatus.FAILED, error });
    }
  },
};
