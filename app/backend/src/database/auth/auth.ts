import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'supersecret';

const config: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

export const createToken = (email: string) => jwt.sign(
  { email },
  secret,
  config,
);

export const validateToken = (token: string) => jwt.verify(token, secret);
