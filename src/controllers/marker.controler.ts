import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { Collection, Types } from "mongoose";

import { paramMissingError } from "../shared/constants";
import { wait } from "../shared/utils";
import MarkerModel from "src/models/marker/MarkerModel";

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/**
 * Get all markerks.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllMarkers(req: Request, res: Response) {
  const markers = await MarkerModel.find().populate("owner");
  return res.json({
    status: "success",
    data: { markers },
  });
}

/**
 * Get markerks.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getMarkers(req: Request, res: Response) {
  const markers = await MarkerModel.find().populate("owner");
  let page = 1;
  const per_page = 10;
  const pages = Math.ceil(markers.length / per_page);
  const total = markers.length;
  if (
    typeof req?.query?.page === "string" &&
    Number.parseInt(req?.query?.page)
  ) {
    page = Number.parseInt(req.query.page);
  }
  const markersFromPage = markers.slice((page - 1) * per_page, page * per_page);
  const pager = {
    count: markersFromPage.length,
    total,
    per_page,
    page,
    pages,
  };

  return res.json({
    status: "success",
    data: { markers: markersFromPage },
    meta: {
      pager,
    },
  });
}

/**
 * Add one marker.
 *
 * @param req
 * @param res
 * @returns
 */
export async function addOneMarker(req: Request, res: Response) {
  const { latitude, longitude, name, description, owner } = req.body;
  const marker = await MarkerModel.create({
    latitude,
    longitude,
    name,
    description,
    owner,
  });
  const result = await marker.save();

  return res.send({ status: "success", data: result });
}

/**
 * Update one marker.
 *
 * @param req
 * @param res
 * @returns
 */
export async function updateOneMarker(req: Request, res: Response) {
  const { marker } = req.body;
  if (!marker) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  marker.id = Number(marker.id);
  await wait(500);

  return res.status(OK).end();
}

/**
 * Delete one marker.
 *
 * @param req
 * @param res
 * @returns
 */
export async function deleteOneMarker(req: Request, res: Response) {
  const { id } = req.params;

  await wait(500);
  return res.status(OK).end();
}

export async function getOneMarker(req: Request, res: Response) {
  const { id } = req.params;
  MarkerModel.findOne({ _id: new Types.ObjectId(id) }).exec(
    (err, collections) => {
      console.log("err", err);
      if (err) {
        res.status(400);
        res.send(err);
      } else {
        if(collections) {
          res.send(collections);
        } else {
          res.status(404);
          res.send({
            error: "User not found"
          });
          
        }
      }
      
    }
  );
}
