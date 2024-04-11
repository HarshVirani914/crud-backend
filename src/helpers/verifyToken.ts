import jwt from 'jsonwebtoken';

export const verifyToken = (token: string) => {

  token = token.split(' ')[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}