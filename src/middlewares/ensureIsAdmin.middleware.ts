import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

export const ensureIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authenticatedUser = req.user.admin;

  if (authenticatedUser !== true) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
