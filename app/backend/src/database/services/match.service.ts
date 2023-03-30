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

const updateInprogressMatch = async (id:string, homeTeamGoals: string, awayTeamGoals: string) => {
  await MatchModel.update(
    { homeTeamGoals, awayTeamGoals },
    { where: { id } },
  );

  return { type: 'success', message: 'Match updated!' };
};

const matchService = {
  getAllMathces,
  getInProgress,
  finishMatch,
  updateInprogressMatch,
};

export default matchService;
