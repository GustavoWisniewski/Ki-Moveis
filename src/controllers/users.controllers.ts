import { Request, Response } from "express";
import { IUser, IUserUpdate } from "../interfaces/users.interfaces";
import { createUserService } from "../services/users/createUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { listUsersService } from "../services/users/listUsers.service";
import { updateUserService } from "../services/users/updateUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const userData: IUser = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};
export const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();

  return res.json(users);
};
export const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(Number(req.params.id));

  return res.status(204).send();
};

export const updateUserController = async (req: Request, res: Response) => {
  const userData: IUserUpdate = req.body;
  const idUser = parseInt(req.params.id);

  const updatedUser = await updateUserService(userData, idUser, req);

  return res.json(updatedUser);
};
