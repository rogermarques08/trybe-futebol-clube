import { Op } from 'sequelize';
import { IBoard } from '../interfaces';
import MatchModel from '../models/match.model';
import TeamModel from '../models/team.model';

const getTotalGames = (id: number, matches: MatchModel[], path: string) => {
  const homeGames = matches.filter((match) => match.homeTeamId === id).length;
  const awayGames = matches.filter((match) => match.awayTeamId === id).length;

  if (path === '/home') return homeGames;
  if (path === '/away') return awayGames;

  return homeGames + awayGames;
};

const calculeteVictories = (id: number, matches: MatchModel[], path: string):number => {
  const homeWins = matches.reduce((acc, curr) => {
    if (curr.homeTeamId === id) {
      const goals = curr.homeTeamGoals > curr.awayTeamGoals ? acc + 1 : acc;
      return goals;
    }
    return acc;
  }, 0);

  const awayWins = matches.reduce((acc, curr) => {
    if (curr.awayTeamId === id) {
      const goals = curr.awayTeamGoals > curr.homeTeamGoals ? acc + 1 : acc;
      return goals;
    }
    return acc;
  }, 0);

  if (path === '/home') return homeWins;
  if (path === '/away') return awayWins;

  return homeWins + awayWins;
};

const calculeteLosses = (id: number, matches: MatchModel[], path:string):number => {
  const homeLosses = matches.reduce((acc, curr) => {
    if (curr.homeTeamId === id) {
      const goals = curr.homeTeamGoals < curr.awayTeamGoals ? acc + 1 : acc;
      return goals;
    }
    return acc;
  }, 0);

  const awayLosses = matches.reduce((acc, curr) => {
    if (curr.awayTeamId === id) {
      const goals = curr.awayTeamGoals < curr.homeTeamGoals ? acc + 1 : acc;
      return goals;
    }
    return acc;
  }, 0);

  if (path === '/home') return homeLosses;
  if (path === '/away') return awayLosses;

  return homeLosses + awayLosses;
};

const calculeteDraws = (id: number, matches: MatchModel[], path: string):number => {
  const homeDraws = matches.reduce((acc, curr) => {
    if (curr.homeTeamId === id) {
      const goals = curr.homeTeamGoals === curr.awayTeamGoals ? acc + 1 : acc;
      return goals;
    }
    return acc;
  }, 0);

  const awayDraws = matches.reduce((acc, curr) => {
    if (curr.awayTeamId === id) {
      const goals = curr.awayTeamGoals === curr.homeTeamGoals ? acc + 1 : acc;
      return goals;
    }
    return acc;
  }, 0);

  if (path === '/home') return homeDraws;
  if (path === '/away') return awayDraws;

  return homeDraws + awayDraws;
};

const getGoalsFavor = (id: number, matches: MatchModel[], path:string): number => {
  const homeGoalsFavor = matches
    .reduce((acc, curr) =>
      (id === curr.homeTeamId ? acc + curr.homeTeamGoals : acc), 0);

  const awayGoalsFavor = matches
    .reduce((acc, curr) =>
      (id === curr.awayTeamId ? acc + curr.awayTeamGoals : acc), 0);

  if (path === '/home') return homeGoalsFavor;
  if (path === '/away') return awayGoalsFavor;

  return homeGoalsFavor + awayGoalsFavor;

  // return matches
  //   .reduce((acc, curr) =>
  //     (id === curr.homeTeamId ? acc + curr.awayTeamGoals : acc), 0);
};

const getGoalsOwn = (id: number, matches: MatchModel[], path:string) => {
  const homeGoalsOwn = matches
    .reduce((acc, curr) =>
      (id === curr.homeTeamId ? acc + curr.awayTeamGoals : acc), 0);

  const awayGoalsOwn = matches
    .reduce((acc, curr) =>
      (id === curr.awayTeamId ? acc + curr.homeTeamGoals : acc), 0);
  if (path === '/home') return homeGoalsOwn;
  if (path === '/away') return awayGoalsOwn;

  return homeGoalsOwn + awayGoalsOwn;

  // return matches
  //   .reduce((acc, curr) =>
  //     (id === curr.homeTeamId ? acc + curr.awayTeamGoals : acc), 0);
};

const getBoard = (id: number, team: string, matches: MatchModel[], path: string) => {
  const board = {
    name: team,
    totalPoints: 0,
    totalGames: getTotalGames(id, matches, path),
    totalVictories: calculeteVictories(id, matches, path),
    totalDraws: calculeteDraws(id, matches, path),
    totalLosses: calculeteLosses(id, matches, path),
    goalsFavor: getGoalsFavor(id, matches, path),
    goalsOwn: getGoalsOwn(id, matches, path),
    goalsBalance: 0,
    efficiency: 0,
  };
  board.totalPoints = board.totalVictories * 3 + board.totalDraws;
  board.goalsBalance = board.goalsFavor - board.goalsOwn;
  board.efficiency = +((board.totalPoints / (board.totalGames * 3)) * 100)
    .toFixed(2);

  return board;
};

const sortBoard = (board: IBoard[]) => board.sort((a, b) => {
  if (a.totalPoints === b.totalPoints) {
    if (a.goalsBalance === b.goalsBalance) {
      return b.goalsFavor - a.goalsFavor;
    }
    return b.goalsBalance - a.goalsBalance;
  }
  return b.totalPoints - a.totalPoints;
});

const getLeaderboard = async (path: string) => {
  const teams = await TeamModel.findAll();

  const board = teams.map(async (team) => {
    const matches: MatchModel[] = await MatchModel.findAll(
      { where: {
        [Op.or]: [{ homeTeamId: team.id }, { awayTeamId: team.id }],
        inProgress: false,
      } },
    );

    const leaderboard = getBoard(team.id, team.teamName, matches, path);

    return leaderboard;
  });

  const leaderboard = await Promise.all(board);
  const sortedBoard = sortBoard(leaderboard);

  return { type: 'success', message: sortedBoard };
};

const leaderboardService = {
  getLeaderboard,
};

export default leaderboardService;
