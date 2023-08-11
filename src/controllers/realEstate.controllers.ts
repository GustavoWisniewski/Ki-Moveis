import { Request, Response } from "express";
import { IRealEstateCreate } from "../interfaces/realEstate.interfaces";
import { createRealEstateService } from "../services/realEstate/createRealEstate.service";
import { listRealEstateService } from "../services/realEstate/listRealEstate.service";

export const createRealEstateControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateData: IRealEstateCreate = req.body;

  const realEstate = await createRealEstateService(realEstateData);

  return res.status(201).json(realEstate);
};
export const listRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstate = await listRealEstateService();

  return res.json(realEstate);
};
