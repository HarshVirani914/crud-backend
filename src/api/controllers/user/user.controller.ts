import User from "src/api/models/user/user.model";
import { ServerError } from "src/utils/error";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { verifyToken } from "src/helpers/verifyToken";

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    return next(new ServerError({
      code: 500,
      message: "Failed to get users.",
    }))
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = verifyToken(req.headers.authorization);

    const user = await User.findById(data.sub);
    if (!user) {
      return next(new ServerError({
        code: 404,
        message: "User not found.",
      }));
    }
    return res.status(200).send(user);
  } catch (error: any) {
    return next(new ServerError({
      code: 500,
      message: "Failed to get user." + error.message,
    }));
  }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

    req.body.password = await bcrypt.hash(req.body.password, 10);

    const user = new User(req.body);
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    return next(new ServerError({
      code: 500,
      message: "Failed to create user.",
    }));
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).send(user);
  } catch (error) {
    return next(new ServerError({
      code: 500,
      message: "Failed to update user.",
    }));
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(204).send({
      message: "User deleted successfully.",
    });
  } catch (error) {
    return next(new ServerError({
      code: 500,
      message: "Failed to delete user.",
    }));
  }
}