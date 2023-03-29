import { Request, Response } from 'express';
import TeamService from '../services/team.service';
import mapTypes from '../utils/mapTypes';

const getAllTeams = async (_req: Request, res: Response) => {
  const { type, message } = await TeamService.getAllTeams();

  return res.status(mapTypes(type)).json(message);
};

const getTeamById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { type, message } = await TeamService.getTeamById(id);

  if (type === 'notFound') return res.status(mapTypes(type)).json({ message });

  return res.status(mapTypes(type)).json(message);
};

const TeamController = {
  getAllTeams,
  getTeamById,
};

export default TeamController;
