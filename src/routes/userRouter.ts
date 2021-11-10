import { Router } from 'express';
import {
  addOneUser,
  getAllUsers,
  getOneUser,
} from '../controllers/users.controller';
import { asyncMiddleware } from '../middlewares/asyncMiddleware';

const userRouter: Router = Router();

userRouter.get('/get-users', asyncMiddleware(getAllUsers));
userRouter.get('/get-user', asyncMiddleware(getOneUser));
userRouter.post('/create-user', asyncMiddleware(addOneUser));

export default userRouter;
