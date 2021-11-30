import { Router } from 'express';
import { categoryController } from '../controllers/category.controller';
import { asyncMiddleware } from '../middlewares/asyncMiddleware';

const catetoryRouter = Router();

catetoryRouter.get('/category', asyncMiddleware(categoryController.get));
catetoryRouter.get(
  '/category/:id',
  asyncMiddleware(categoryController.getById)
);
catetoryRouter.post('/category', asyncMiddleware(categoryController.create));
catetoryRouter.put('/category/:id', asyncMiddleware(categoryController.update));
catetoryRouter.delete(
  '/category/:id',
  asyncMiddleware(categoryController.delete)
);

export default catetoryRouter;
