import * as express from 'express';
import matchController from '../controllers/match.controller';
import validateJWT from '../middleware/validateJWT';

const matchRoutes = express.Router();

matchRoutes.patch('/:id/finish', validateJWT, matchController.finishMatch);

matchRoutes.get('/', matchController.getAllMathces);

export default matchRoutes;
