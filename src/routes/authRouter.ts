import { Router } from 'express';
import { logout, singIn, singUp } from '../controllers/auth.controller';
import { asyncMiddleware } from '../middlewares/asyncMiddleware';

const authRouter: Router = Router();

authRouter.post('/sign-in', asyncMiddleware(singIn));
authRouter.post('/sign-up', asyncMiddleware(singUp));
authRouter.get('/logout', asyncMiddleware(logout));

export default authRouter;
