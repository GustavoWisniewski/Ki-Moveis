import {
  addressSchema,
  createAddressSchema,
  realEstateSchema,
  createRealEstateSchema,
  returnMultipleRealEstateSchema,
} from "../schemas/realEstate.schemas";
import { z } from "zod";
import { DeepPartial } from "typeorm";

export type IAddressReturn = DeepPartial<z.infer<typeof addressSchema>>;
export type IAddress = z.infer<typeof createAddressSchema>;
export type IRealEstate = z.infer<typeof realEstateSchema>;
export type IRealEstateCreate = z.infer<typeof createRealEstateSchema>;

export type IRealEstateArray = z.infer<typeof returnMultipleRealEstateSchema>;
