import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import { paramMissingError } from '../shared/constants';
import { wait } from '../shared/utils';
import UserModel from '../models/user/UserModel';

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/**
 * Get all users.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAllUsers(req: Request, res: Response) {
  const users = await UserModel.find({});

  return res.status(OK).json({ users });
}

/**
 * Update one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function updateOneUser(req: Request, res: Response) {
  const { user } = req.body;
  if (!user) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  user.id = Number(user.id);
  await wait(500);

  return res.status(OK).end();
}

/**
 * Delete one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function deleteOneUser(req: Request, res: Response) {
  const { id } = req.params;

  await wait(500);
  return res.status(OK).end();
}

export async function getOneUser(req: Request, res: Response) {
  return res.status(400);
}
