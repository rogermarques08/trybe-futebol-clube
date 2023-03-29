import * as express from 'express';
import TeamController from '../controllers/team.controller';

const TeamRoutes = express.Router();

TeamRoutes.get('/', TeamController.getAllTeams);

export default TeamRoutes;
