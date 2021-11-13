import { Router } from "express";
import {
  getAllMarkers,
  getMarkers,
  addOneMarker,
  getOneMarker,
  deleteOneMarker,
} from "../controllers/marker.controler";
import { asyncMiddleware } from "../middlewares/asyncMiddleware";

const markerRouter = Router();

markerRouter.get("/get-all-markers", asyncMiddleware(getAllMarkers));
markerRouter.get("/get-markers", asyncMiddleware(getMarkers));
markerRouter.get("/get-marker/:id", asyncMiddleware(getOneMarker));
markerRouter.post("/create-marker", asyncMiddleware(addOneMarker));
markerRouter.delete("/delete-marker/:id", asyncMiddleware(deleteOneMarker));
// markerRouter.put('/edit-marker', asyncMiddleware());

export default markerRouter;
