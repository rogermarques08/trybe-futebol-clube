import * as express from 'express';
import matchController from '../controllers/match.controller';
import validateJWT from '../middleware/validateJWT';

const matchRoutes = express.Router();

matchRoutes.patch('/:id/finish', validateJWT, matchController.finishMatch);

matchRoutes.patch('/:id', validateJWT, matchController.updateInprogressMatch);

matchRoutes.get('/', matchController.getAllMathces);

matchRoutes.post('/', validateJWT, matchController.createMatch);

export default matchRoutes;
