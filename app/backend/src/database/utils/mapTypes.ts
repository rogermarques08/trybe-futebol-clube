import { IType } from '../interfaces';

const types: IType = {
  success: 200,
  notFound: 404,
};

const mapTypes = (type: string): number => types[type] || 500;

export default mapTypes;
