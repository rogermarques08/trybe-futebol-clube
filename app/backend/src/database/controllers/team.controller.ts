import { Request, Response } from 'express';
import TeamService from '../services/team.service';
import mapTypes from '../utils/mapTypes';

const getAllTeams = async (_req: Request, res: Response) => {
  const { type, message } = await TeamService.getAllTeams();

  return res.status(mapTypes(type)).json(message);
};

const TeamController = {
  getAllTeams,
};

export default TeamController;
