import Match from '../models/match.model';
import Teams from '../models/team.model';

export interface IType {
  [sucess: string]: number
  notFound: number
  invalidFields: number
  success: number
  created: number,
  incorrectInfos: number
  tokenNotFound: number
  invalidToken: number,
  equalTeams: number
}

export interface ITypeMessage {
  type: string,
  message: string | Teams[] | Teams | Match[] | Math
}
