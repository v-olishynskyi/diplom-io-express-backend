import { Router } from 'express';
import { getAllUsers, getOneUser } from '../controllers/users.controller';
import { asyncMiddleware } from '../middlewares/asyncMiddleware';

const userRouter: Router = Router();

userRouter.get('/get-all-users', asyncMiddleware(getAllUsers));
userRouter.get('/get-user', asyncMiddleware(getOneUser));

export default userRouter;
