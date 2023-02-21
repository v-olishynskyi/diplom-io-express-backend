import { Router } from 'express';
import { userControllers } from '../controllers/users.controller';
import { asyncMiddleware } from '../middlewares/asyncMiddleware';

const userRouter: Router = Router();

userRouter.get('/users', asyncMiddleware(userControllers.getAllUsers));
userRouter.get('/users/:id', asyncMiddleware(userControllers.getUserById));
userRouter.get(
  '/users/get-user-by-email/:email',
  asyncMiddleware(userControllers.getUserByEmail)
);
userRouter.get(
  '/users/get-user-by-username/:username',
  asyncMiddleware(userControllers.getUserByUsername)
);
userRouter.put('/users/:id', asyncMiddleware(userControllers.update));
userRouter.delete('/users/:id', asyncMiddleware(userControllers.delete));

export default userRouter;
