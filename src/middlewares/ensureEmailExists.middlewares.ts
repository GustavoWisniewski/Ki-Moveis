import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../error";

export const ensureEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  if (req.body.email) {
    const findUser = await userRepository.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (findUser) {
      throw new AppError("Email already exists", 409);
    }
  }

  return next();
};
