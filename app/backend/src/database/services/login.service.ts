import * as bcrypt from 'bcryptjs';
import { createToken } from '../auth/auth';
import { ITypeMessage } from '../interfaces';
import UserModel from '../models/user.model';
import loginValidations from './validations/loginValidations';

const login = async (email: string, password: string): Promise<ITypeMessage> => {
  const validate = loginValidations(email, password);
  if (validate.type) return validate;

  const getUser = await UserModel.findOne({ where: { email } });
  if (!getUser) return { type: 'incorrectInfos', message: 'Invalid email or password' };

  const hash = getUser.dataValues.password;
  if (!bcrypt.compareSync(password, hash)) {
    return { type: 'incorrectInfos', message: 'Invalid email or password' };
  }

  const token = createToken(email);

  return { type: 'success', message: token };
};

const getUserRole = async (email: string): Promise<ITypeMessage> => {
  const getUser = await UserModel.findOne({ where: { email } });
  if (!getUser) return { type: 'notFound', message: 'User not found' };

  return { type: 'success', message: getUser.role };
};

const loginService = {
  login,
  getUserRole,
};

export default loginService;
