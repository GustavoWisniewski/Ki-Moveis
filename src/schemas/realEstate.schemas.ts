import { z } from "zod";

export const addressSchema = z.object({
  id: z.number(),
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).optional(),
  city: z.string(),
  state: z.string().max(2),
});

export const createAddressSchema = addressSchema.omit({
  id: true,
});

export const realEstateSchema = z.object({
  id: z.number(),
  value: z.number().or(z.string()),
  size: z.number().min(0, "Number must be greater than 0"),
  categoryId: z.number(),
  address: createAddressSchema,
});
export const createRealEstateSchema = realEstateSchema.omit({
  id: true,
});

export const returnMultipleRealEstateSchema = realEstateSchema.array();
