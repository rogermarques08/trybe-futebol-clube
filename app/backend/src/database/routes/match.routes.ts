import * as express from 'express';
import matchController from '../controllers/match.controller';

const matchRoutes = express.Router();

matchRoutes.get('/', matchController.getAllMathces);

export default matchRoutes;
