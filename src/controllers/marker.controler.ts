import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import { paramMissingError, ResponseStatus } from '../shared/constants';
import UserModel from '../models/user/UserModel';
import MarkerModel from '../models/marker/MarkerModel';

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export const MarkerController = {
  all: async (req: Request, res: Response) => {
    const markers = await MarkerModel.find().populate('owner');
    return res.json({
      status: 'success',
      data: { markers },
    });
  },
  allWithPagination: async (req: Request, res: Response) => {
    const markers = await MarkerModel.find().populate('owner');
    let page = 1;
    const per_page = 10;
    const pages = Math.ceil(markers.length / per_page);
    const total = markers.length;
    if (
      typeof req?.query?.page === 'string' &&
      Number.parseInt(req?.query?.page)
    ) {
      page = Number.parseInt(req.query.page);
    }
    const markersFromPage = markers.slice(
      (page - 1) * per_page,
      page * per_page
    );
    const pager = {
      count: markersFromPage.length,
      total,
      per_page,
      page,
      pages,
    };

    return res.json({
      status: 'success',
      data: { markers: markersFromPage },
      meta: {
        pager,
      },
    });
  },
  find: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError,
        });
      }

      const marker = await MarkerModel.findById(id).populate('owner');

      if (!marker) {
        return res.status(404).json({
          status: ResponseStatus.FAILED,
          error: {
            code: 404,
            message: 'Marker not found',
          },
        });
      }

      return res
        .status(OK)
        .json({ status: ResponseStatus.SUCCESS, data: { marker } });
    } catch (error) {
      res.status(500).json({
        status: ResponseStatus.FAILED,
        error,
      });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { latitude, longitude, name, description, ownerID } = req.body;

      if (!latitude || !longitude || !name || !ownerID) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError,
        });
      }

      const marker = new MarkerModel({
        latitude,
        longitude,
        name,
        description,
        owner: ownerID,
      });
      const result = await marker.save();

      const user = await UserModel.findByIdAndUpdate(
        ownerID,
        {
          $push: { markers: result.id },
        },
        { new: true, populate: 'markers' }
      );

      // @ts-ignore
      result.owner = user;

      return res
        .status(CREATED)
        .send({ status: 'success', data: { marker: result } });
    } catch (error) {
      return res.status(500).json({ status: ResponseStatus.FAILED, error });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { latitude, longitude, name, description, owner } = req.body;
      if (!id) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError,
        });
      }

      const marker = await MarkerModel.findByIdAndUpdate(
        id,
        {
          $set: {
            latitude,
            longitude,
            name,
            description,
            owner,
          },
        },
        { new: true, populate: 'owner' }
      );

      if (!marker) {
        return res.status(404).json({
          status: ResponseStatus.FAILED,
          error: {
            code: 404,
            message: 'Marker not found',
          },
        });
      }

      return res.status(OK).json({ status: 'success', data: { marker } });
    } catch (error) {
      res.status(500).json({
        // status: ResponseStatus.FAILED,
        code: 500,
        error,
      });
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
      const remove = await MarkerModel.findByIdAndRemove(id).populate('owner');

      if (!remove) {
        return res.status(404).json({
          // status: ResponseStatus.FAILED,
          error: {
            code: 404,
            message: 'Marker not found',
          },
        });
      }

      return res.status(200).json({ status: 'success', data: { remove } });
    } catch (error) {
      res.status(500).json({
        // status: ResponseStatus.FAILED,
        code: 500,
        error,
      });
    }
  },
};
