import { ITypeMessage } from '../interfaces';
import MatchModel from '../models/match.model';
import TeamModel from '../models/team.model';

const getAllMathces = async (): Promise<ITypeMessage> => {
  const matches = await MatchModel.findAll({
    include: [
      { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ],
  });

  return { type: 'success', message: matches };
};

const getInProgress = async (inProgress: boolean): Promise<ITypeMessage> => {
  const matches = await MatchModel.findAll({
    include: [
      { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ],
    where: { inProgress },
  });

  return { type: 'success', message: matches };
};

const finishMatch = async (id: string) => {
  await MatchModel.update({ inProgress: false }, { where: { id } });

  return { type: 'success', message: 'Finished' };
};

const updateInprogressMatch = async (
  id: string,
  homeTeamGoals: string,
  awayTeamGoals: string,
): Promise<ITypeMessage> => {
  await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

  return { type: 'success', message: 'Match updated!' };
};

const equalTeamsError = {
  type: 'equalTeams',
  message: 'It is not possible to create a match with two equal teams',
};

const teamNotFoundError = {
  type: 'notFound',
  message: 'There is no team with such id!',
};

const createMatch = async (
  homeTeamId: string,
  awayTeamId: string,
  homeTeamGoals: string,
  awayTeamGoals: string,
): Promise<ITypeMessage> => {
  if (homeTeamId === awayTeamId) return equalTeamsError;

  const getHomeTeam = await TeamModel.findByPk(homeTeamId);
  const getAwayTeam = await TeamModel.findByPk(awayTeamId);

  if (!getHomeTeam || !getAwayTeam) return teamNotFoundError;

  const { dataValues } = await MatchModel.create({
    homeTeamId,
    awayTeamId,
    homeTeamGoals,
    awayTeamGoals,
    inProgress: true,
  });

  return { type: 'created', message: dataValues };
};

const matchService = {
  getAllMathces,
  getInProgress,
  finishMatch,
  updateInprogressMatch,
  createMatch,
};

export default matchService;
