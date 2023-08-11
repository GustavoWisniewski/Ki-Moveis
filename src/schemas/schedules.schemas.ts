import { date, z } from "zod";

export const schedulesSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

export const createSchedulesSchema = schedulesSchema.omit({
  id: true,
});
