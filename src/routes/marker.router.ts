import { Request, Router, Response } from 'express';
import { asyncMiddleware } from '../middlewares/asyncMiddleware';
import MarkerModel from '../models/marker/MarkerModel';

const markerRouter = Router();

markerRouter.get(
  '/get-all-markers',
  asyncMiddleware(async (req, res, next) => {
    const markers = await MarkerModel.find().populate('owner');

    return res.json({ status: 'success', data: { markers } });
  })
);
// markerRouter.get('/get-marker', asyncMiddleware());
markerRouter.post(
  '/create-marker',
  asyncMiddleware(async (req: Request, res: Response) => {
    const marker = await MarkerModel.create({
      latitude: 1,
      longitude: 1,
      name: 'testname',
      description: 'qweqeqqwq',
      owner: '618c36a2bccf38b0491774a4',
    });
    const result = await marker.save();

    return res.send({ status: 'success', data: result });
  })
);
// markerRouter.delete('/delete-marker', asyncMiddleware());
// markerRouter.put('/edit-marker', asyncMiddleware());

export default markerRouter;
