import { Op } from 'sequelize';
import { IBoard } from '../interfaces';
import MatchModel from '../models/match.model';
import TeamModel from '../models/team.model';

const getTotalGames = (id: number, matches: MatchModel[]) => {
  const getGames = matches.filter((match) => match.homeTeamId === id);

  return getGames.length;
};

const calculeteVictories = (id: number, matches: MatchModel[]):number => {
  const homeWins = matches.reduce((acc, curr) => {
    if (curr.homeTeamId === id) {
      const goals = curr.homeTeamGoals > curr.awayTeamGoals ? acc + 1 : acc;
      return goals;
    }
    return acc;
  }, 0);

  // const awayWins = matches.reduce((acc, curr) => {
  //   if (curr.awayTeamId === id) {
  //     const goals = curr.awayTeamGoals > curr.homeTeamGoals ? acc + 1 : acc;
  //     return goals;
  //   }
  //   return acc;
  // }, 0);

  return homeWins;
};

const calculeteLosses = (id: number, matches: MatchModel[]):number => {
  const homeLosses = matches.reduce((acc, curr) => {
    if (curr.homeTeamId === id) {
      const goals = curr.homeTeamGoals < curr.awayTeamGoals ? acc + 1 : acc;
      return goals;
    }
    return acc;
  }, 0);

  // const awayLosses = matches.reduce((acc, curr) => {
  //   if (curr.awayTeamId === id) {
  //     const goals = curr.awayTeamGoals < curr.homeTeamGoals ? acc + 1 : acc;
  //     return goals;
  //   }
  //   return acc;
  // }, 0);

  return homeLosses;
};

const calculeteDraws = (id: number, matches: MatchModel[]):number => {
  const homeDraws = matches.reduce((acc, curr) => {
    if (curr.homeTeamId === id) {
      const goals = curr.homeTeamGoals === curr.awayTeamGoals ? acc + 1 : acc;
      return goals;
    }
    return acc;
  }, 0);

  // const awayDraws = matches.reduce((acc, curr) => {
  //   if (curr.awayTeamId === id) {
  //     const goals = curr.awayTeamGoals === curr.homeTeamGoals ? acc + 1 : acc;
  //     return goals;
  //   }
  //   return acc;
  // }, 0);

  return homeDraws;
};

const getGoals = (id: number, matches: MatchModel[], type: string): number => {
  if (type === 'favor') {
    return matches
      .reduce((acc, curr) =>
        (id === curr.homeTeamId ? acc + curr.homeTeamGoals : acc), 0);
  }

  return matches
    .reduce((acc, curr) =>
      (id === curr.homeTeamId ? acc + curr.awayTeamGoals : acc), 0);
};

const getBoard = (id: number, team: string, matches: MatchModel[], path: string) => {
  console.log(path);
  const board = {
    name: team,
    totalPoints: 0,
    totalGames: getTotalGames(id, matches),
    totalVictories: calculeteVictories(id, matches),
    totalDraws: calculeteDraws(id, matches),
    totalLosses: calculeteLosses(id, matches),
    goalsFavor: getGoals(id, matches, 'favor'),
    goalsOwn: getGoals(id, matches, 'own'),
    goalsBalance: getGoals(id, matches, 'favor') - getGoals(id, matches, 'own'),
    efficiency: 0,
  };
  board.totalPoints = board.totalVictories * 3 + board.totalDraws;
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
