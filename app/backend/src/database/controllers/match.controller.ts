import { Request, Response } from 'express';
import matchService from '../services/match.service';
import mapTypes from '../utils/mapTypes';

const getAllMathces = async (req: Request, res: Response) => {
  const { type, message } = await matchService.getAllMathces();

  return res.status(mapTypes(type)).json(message);
};

const matchController = {
  getAllMathces,
};

export default matchController;
