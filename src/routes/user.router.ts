import { Router } from 'express';
import { userControllers } from '../controllers/users.controller';
import { asyncMiddleware } from '../middlewares/asyncMiddleware';

const userRouter: Router = Router();

userRouter.get('/get-all-users', asyncMiddleware(userControllers.getAllUsers));
userRouter.get(
  '/get-user-by-id/:id',
  asyncMiddleware(userControllers.getUserById)
);
userRouter.put('/edit-user', asyncMiddleware(userControllers.editUser));
userRouter.delete(
  '/delete-user/:id',
  asyncMiddleware(userControllers.deleteUserById)
);

export default userRouter;
