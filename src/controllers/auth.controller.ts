import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/user/UserModel';
import { wait } from '../shared/utils';

export async function singIn(req: Request, res: Response) {
  // do something...
  await wait(500);
  return res.status(StatusCodes.OK).json({ succes: true });
}

export async function singUp(req: Request, res: Response) {
  try {
    const { body } = req;
    const { email, username, name, family_name } = body;

    const user = new UserModel({ email, name, username, family_name });

    const result = await user.save();
    return res.status(StatusCodes.OK).json({ success: true, data: result });
  } catch (error) {
    console.log('ERORR', error);

    return res.status(400).json({ error });
  }
}

export async function signOut(req: Request, res: Response) {
  // do something...
  await wait(500);
  return res.status(StatusCodes.OK);
}
