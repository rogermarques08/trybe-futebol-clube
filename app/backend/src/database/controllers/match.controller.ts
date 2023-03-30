import { Request, Response } from 'express';
import matchService from '../services/match.service';
import mapTypes from '../utils/mapTypes';

const getInProgress = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const query = inProgress === 'true';

  const { type, message } = await matchService.getInProgress(query);

  return res.status(mapTypes(type)).json(message);
};

const getAllMathces = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  if (inProgress !== undefined) return getInProgress(req, res);

  const { type, message } = await matchService.getAllMathces();

  return res.status(mapTypes(type)).json(message);
};

const finishMatch = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { type, message } = await matchService.finishMatch(id);

  return res.status(mapTypes(type)).json({ message });
};

const matchController = {
  getAllMathces,
  getInProgress,
  finishMatch,
};

export default matchController;
