import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../error";
import { ICategoriesCreate } from "../../interfaces/categories.interfaces";

export const createCategoriesService = async (
  categoryData: ICategoriesCreate
): Promise<Category> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  if (categoryData.name) {
    const nameCategory = await categoryRepository.findOne({
      where: {
        name: categoryData.name,
      },
    });

    if (nameCategory) {
      throw new AppError("Category already exists", 409);
    }
  }

  const category = categoryRepository.create(categoryData);
  await categoryRepository.save(category);

  return category;
};
