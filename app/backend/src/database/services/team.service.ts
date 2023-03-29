import { ITypeMessage } from '../interfaces';
import TeamModel from '../models/team.model';

const getAllTeams = async (): Promise<ITypeMessage> => {
  const teams = await TeamModel.findAll();

  return { type: 'success', message: teams };
};

const TeamService = {
  getAllTeams,
};

export default TeamService;
