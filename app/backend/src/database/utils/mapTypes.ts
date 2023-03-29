import { IType } from '../interfaces';

const types: IType = {
  success: 200,
  invalidFields: 400,
  notFound: 404,
  incorrectInfos: 401,
};

const mapTypes = (type: string): number => types[type] || 500;

export default mapTypes;
