import StatusCodes from "http-status-codes";
import { Request, Response } from "express";

import { paramMissingError, ResponseStatus } from "../shared/constants";
import UserModel from "../models/user/UserModel";
import MarkerModel from "../models/marker/MarkerModel";

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export const MarkerController = {
  all: async (req: Request, res: Response) => {
    const markers = await MarkerModel.find().populate("owner");
    return res.json({
      status: "success",
      data: { markers },
    });
  },
  allWithPagination: async (req: Request, res: Response) => {
    const per_page = 10;
    let page = 1;
    if (
      typeof req?.query?.page === "string" &&
      Number.parseInt(req?.query?.page)
    ) {
      page = Number.parseInt(req.query.page);
    }
    try {
      const model = MarkerModel;
      const markersItems = await model
        .find()
        .limit(per_page)
        .skip(per_page * (page - 1));
      const modelItemsCount = await model.countDocuments().exec();

      const pager = {
        count: markersItems.length,
        total: modelItemsCount,
        per_page,
        page: page,
        pages: Math.ceil(modelItemsCount / per_page),
      };

      return res.json({
        status: "success",
        data: markersItems,
        meta: {
          pager,
        },
      });
    } catch (error) {
      res.status(500).json({ status: ResponseStatus.FAILED, error });
    }
  },
  find: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError,
        });
      }

      const marker = await MarkerModel.findById(id).populate("owner");

      if (!marker) {
        return res.status(404).json({
          status: ResponseStatus.FAILED,
          error: {
            code: 404,
            message: "Marker not found",
          },
        });
      }

      return res.status(OK).json({ marker });
    } catch (error) {
      res.status(500).json({
        status: ResponseStatus.FAILED,
        error,
      });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { latitude, longitude, name, description, owner } = req.body;

      if (!latitude || !longitude || !name || !owner) {
        return res.status(BAD_REQUEST).json({
          error: paramMissingError,
        });
      }

      const marker = new MarkerModel({
        latitude,
        longitude,
        name,
        description,
        owner,
      });
      const result = await marker.save();

      await UserModel.findByIdAndUpdate(owner, {
        $push: { markers: result.id },
      });

      return res.status(CREATED).send({ status: "success", data: result });
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

      const marker = await MarkerModel.findByIdAndUpdate(id, {
        $set: {
          latitude,
          longitude,
          name,
          description,
          owner,
        },
      });

      if (!marker) {
        return res.status(404).json({
          status: ResponseStatus.FAILED,
          error: {
            code: 404,
            message: "Marker not found",
          },
        });
      }

      return res.status(OK).json({ status: "success" });
    } catch (error) {
      res.status(500).json({
        status: ResponseStatus.FAILED,
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
      const remove = await MarkerModel.findByIdAndRemove(id).populate("owner");

      if (!remove) {
        return res.status(404).json({
          status: ResponseStatus.FAILED,
          error: {
            code: 404,
            message: "Marker not found",
          },
        });
      }

      return res.status(200).json({ status: "success", data: { remove } });
    } catch (error) {
      res.status(500).json({
        status: ResponseStatus.FAILED,
        code: 500,
        error,
      });
    }
  },
};
