import { Router } from 'express';
import { MarkerController } from '../controllers/marker.controler';
import { asyncMiddleware } from '../middlewares/asyncMiddleware';

const markerRouter = Router();

markerRouter.get('/markers', asyncMiddleware(MarkerController.get));
markerRouter.get(
  '/markers/get-markers',
  asyncMiddleware(MarkerController.allWithPagination)
);
markerRouter.get('/markers/:id', asyncMiddleware(MarkerController.findById));
markerRouter.post('/markers', asyncMiddleware(MarkerController.create));
markerRouter.put('/markers/:id', asyncMiddleware(MarkerController.update));
markerRouter.delete('/markers/:id', asyncMiddleware(MarkerController.delete));

export default markerRouter;
