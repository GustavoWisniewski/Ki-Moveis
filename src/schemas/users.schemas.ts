import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3).max(45),
  email: z.string().email().max(45),
  password: z.string().min(4).max(20),
  admin: z.boolean().optional().default(false),
});

const userUpdateSchema = userSchema.partial().omit({ admin: true });

const returnUserSchema = userSchema
  .extend({
    id: z.number(),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
    deletedAt: z.string().nullable(),
  })
  .omit({ password: true });

const returnMultipleUserSchema = returnUserSchema.array();

export {
  userSchema,
  returnUserSchema,
  returnMultipleUserSchema,
  userUpdateSchema,
};
