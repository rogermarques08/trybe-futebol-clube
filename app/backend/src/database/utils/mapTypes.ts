import { IType } from '../interfaces';

const types: IType = {
  success: 200,
  invalidFields: 400,
  incorrectInfos: 401,
  tokenNotFound: 401,
  invalidToken: 401,
  notFound: 404,
};

const mapTypes = (type: string): number => types[type] || 500;

export default mapTypes;
