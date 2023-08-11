import {
  createCategoriesSchema,
  categoriesSchema,
  returnMultipleCategorioesSchema,
} from "../schemas/categories.schemas";
import { z } from "zod";

export type ICategory = z.infer<typeof categoriesSchema>;
export type ICategoriesCreate = z.infer<typeof createCategoriesSchema>;
export type ICategoriesArray = z.infer<typeof returnMultipleCategorioesSchema>;
