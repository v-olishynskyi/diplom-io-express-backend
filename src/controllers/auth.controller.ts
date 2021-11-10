import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { wait } from '../shared/utils';

export async function singIn(req: Request, res: Response) {
  // do something...
  await wait(500);
  return res.status(StatusCodes.OK);
}

export async function singUp(req: Request, res: Response) {
  // do something...
  await wait(500);
  return res.status(StatusCodes.OK);
}

export async function logout(req: Request, res: Response) {
  // do something...
  await wait(500);
  return res.status(StatusCodes.OK);
}
