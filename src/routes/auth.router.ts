import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { asyncMiddleware } from '../middlewares/asyncMiddleware';

const authRouter: Router = Router();

authRouter.post('/sign-in', asyncMiddleware(authController.signIn));
authRouter.post('/sign-up', asyncMiddleware(authController.signUp));
authRouter.get('/sign-out', asyncMiddleware(authController.signOut));

export default authRouter;
