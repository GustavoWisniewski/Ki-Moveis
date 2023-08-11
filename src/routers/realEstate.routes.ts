import { Router } from "express";
import {
  createRealEstateControllers,
  listRealEstateController,
} from "../controllers/realEstate.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { createRealEstateSchema } from "../schemas/realEstate.schemas";
const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(createRealEstateSchema),
  ensureIsAdminMiddleware,
  createRealEstateControllers
);
realEstateRoutes.get("", listRealEstateController);

export default realEstateRoutes;
