import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const generateToken = (
  userId: mongoose.Types.ObjectId,
): string => {
  const payload = {
    sub: userId,
  };
  return jwt.sign(payload, process.env.JWT_SECRET as string);
};