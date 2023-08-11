import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../error";

export const listRealEstatesByCategoryIdService = async (
  categoryId: number
): Promise<any> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoryData = await categoryRepository.findOne({
    where: {
      id: categoryId,
    },
  });
  if (!categoryData) {
    throw new AppError("Category not found", 404);
  }
  const realEstatesData = await categoryRepository.findOne({
    where: { id: categoryId },
    relations: { realEstate: true },
  });

  return realEstatesData;
};
