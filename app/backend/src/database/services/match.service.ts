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

const matchService = {
  getAllMathces,
};

export default matchService;
