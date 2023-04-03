import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboard.service';
import mapTypes from '../utils/mapTypes';

const getLeaderboard = async (req: Request, res: Response) => {
  const { path } = req.route;
  const { type, message } = await leaderboardService.getLeaderboard(path);

  return res.status(mapTypes(type)).json(message);
};

const leaderboardController = {
  getLeaderboard,
};

export default leaderboardController;
