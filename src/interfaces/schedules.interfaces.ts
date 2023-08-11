import {
  schedulesSchema,
  createSchedulesSchema,
} from "../schemas/schedules.schemas";
import { z } from "zod";

export type ISchedules = z.infer<typeof schedulesSchema>;
export type ISchedulesCreate = z.infer<typeof createSchedulesSchema>;
