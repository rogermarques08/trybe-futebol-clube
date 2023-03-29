import Teams from '../models/team.model';

export interface IType {
  [sucess: string]: number
  notFound: number
  invalidFields: number
}

export interface ITypeMessage {
  type: string,
  message: string | Teams[] | Teams
}
