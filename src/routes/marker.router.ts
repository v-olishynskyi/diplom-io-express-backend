import { Router } from "express";
import { MarkerController } from "../controllers/marker.controler";
import { asyncMiddleware } from "../middlewares/asyncMiddleware";

const markerRouter = Router();

markerRouter.get("/get-all-markers", asyncMiddleware(MarkerController.all));
markerRouter.get("/get-markers", asyncMiddleware(MarkerController.allWithPagination));
markerRouter.get("/get-marker/:id", asyncMiddleware(MarkerController.find));
markerRouter.post("/create-marker", asyncMiddleware(MarkerController.create));
markerRouter.delete("/delete-marker/:id", asyncMiddleware(MarkerController.delete));
markerRouter.put('/edit-marker/:id', asyncMiddleware(MarkerController.edit));

export default markerRouter;
