import { NextFunction, Request, Response } from "express";
import User from "src/api/models/user/user.model";
import { ServerError } from "src/utils/error";
import bcrypt from "bcryptjs"
import { generateToken } from "src/helpers/generateToken";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ServerError({
        code: 404,
        message: "User not found.",
      }));
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return next(new ServerError({
        code: 401,
        message: "Invalid credentials.",
      }));
    }

    //use passport to generate token
    const token = generateToken(user._id);
    return res.status(200).send({ user, token });

  } catch (error) {
    return next(new ServerError({
      code: 500,
      message: "Failed to login.",
    }));
  }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    console.log(passwordHash)

    req.body.password = passwordHash;

    const user = new User(req.body);
    await user.save();
    const token = generateToken(user._id);
    return res.status(201).send({ user, token });
  } catch (error: any) {
    console.log(error);
    return next(new ServerError({
      code: 500,
      message: "Failed to register." + error.message,
    }));
  }
}

