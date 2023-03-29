import Teams from '../models/team.model';

export interface IType {
  [sucess: string]: number
}

export interface ITypeMessage {
  type: string,
  message: Teams[]
}
