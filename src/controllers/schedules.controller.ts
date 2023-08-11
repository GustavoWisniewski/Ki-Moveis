import { Request, Response } from "express";
import { ISchedulesCreate } from "../interfaces/schedules.interfaces";
import { createSchedulesService } from "../services/schedules/createSchedules.service";
import { listSchedulesService } from "../services/schedules/listSchecules.service";

export const createSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const schedulesData: ISchedulesCreate = req.body;
  const userId: number = req.user.id;

  const schedules = await createSchedulesService(schedulesData, userId);

  return res.status(201).json(schedules);
};
export const listSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const RealEstateId: number = Number(req.params.id);
  const schedules = await listSchedulesService(RealEstateId);

  return res.json(schedules);
};
