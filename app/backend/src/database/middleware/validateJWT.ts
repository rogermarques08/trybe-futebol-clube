import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../auth/auth';
import mapTypes from '../utils/mapTypes';

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) return res.status(mapTypes('tokenNotFound')).json({ message: 'Token not found' });

  try {
    const validate = validateToken(token);
    req.body.user = validate;
  } catch (error) {
    return res.status(mapTypes('invalidToken')).json({ message: 'Token must be a valid token' });
  }

  next();
};

export default validateJWT;
