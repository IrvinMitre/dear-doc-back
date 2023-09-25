import { UserInterface } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';

export const createJWTToken = (userData: UserInterface) =>
  jwt.sign(userData, `${process.env.JWT_SECRET}`, {
    algorithm: 'HS256',
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });

export const createJWTRefreshToken = (userData: UserInterface) =>
  jwt.sign(userData, `${process.env.REFRESH_TOKEN_SECRET}`, {
    algorithm: 'HS256',
    expiresIn: process.env.REFRESH_TOKEN_LIFE,
  });

export const verifyJWTToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET || '', { algorithms: ['HS256'] });

export const verifyRefreshJWT = (token: string) =>
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || '', {
    algorithms: ['HS256'],
  });
  