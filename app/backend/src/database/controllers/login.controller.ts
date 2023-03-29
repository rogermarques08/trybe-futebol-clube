import { Request, Response } from 'express';
import loginService from '../services/login.service';
import mapTypes from '../utils/mapTypes';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { type, message } = await loginService.login(email, password);
  if (type === 'success') return res.status(mapTypes(type)).json({ token: message });

  return res.status(mapTypes(type)).json({ message });
};

const loginController = {
  login,
};

export default loginController;
