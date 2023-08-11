import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { ICategoriesArray } from "../../interfaces/categories.interfaces";
import { returnMultipleCategorioesSchema } from "../../schemas/categories.schemas";

export const listCategoriesService = async (): Promise<ICategoriesArray> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoriesData = await categoryRepository.find({});

  const categories = returnMultipleCategorioesSchema.parse(categoriesData);

  return categories;
};
