import { Request, Response } from "express";
import { ICategoriesCreate } from "../interfaces/categories.interfaces";
import { createCategoriesService } from "../services/categories/createCategories.service";
import { listCategoriesService } from "../services/categories/listCategories.service";
import { listRealEstatesByCategoryIdService } from "../services/categories/listCategoriesId.service";

export const createCategoriesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: ICategoriesCreate = req.body;
  const category = await createCategoriesService(categoryData);

  return res.status(201).json(category);
};
export const listCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories = await listCategoriesService();

  return res.json(categories);
};
export const listCategoriesIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = Number(req.params.id);
  const categories = await listRealEstatesByCategoryIdService(categoryId);

  return res.json(categories);
};
