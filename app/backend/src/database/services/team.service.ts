import { ITypeMessage } from '../interfaces';
import TeamModel from '../models/team.model';

const getAllTeams = async (): Promise<ITypeMessage> => {
  const teams = await TeamModel.findAll();

  return { type: 'success', message: teams };
};

const getTeamById = async (id: string): Promise<ITypeMessage> => {
  const team = await TeamModel.findByPk(id);

  if (!team) return { type: 'notFound', message: 'Team not found' };

  return { type: 'success', message: team };
};

const TeamService = {
  getAllTeams,
  getTeamById,
};

export default TeamService;
