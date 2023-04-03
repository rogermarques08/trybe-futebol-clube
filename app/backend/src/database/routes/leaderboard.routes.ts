import * as express from 'express';
import leaderboardController from '../controllers/leaderboard.controller';

const leaderboardRoutes = express.Router();

leaderboardRoutes.get('/home', leaderboardController.getLeaderboard);

leaderboardRoutes.get('/away', leaderboardController.getLeaderboard);

export default leaderboardRoutes;
