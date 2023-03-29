import { DataTypes, Model } from 'sequelize';
import db from '.';
import TeamModel from './team.model';

class MatchModel extends Model {
  declare id: number;
  declare teamName: string;
}

MatchModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

/**
 * `Workaround` para aplicar as associations em TS:
 * Associations 1:N devem ficar em uma das instâncias de modelo
 * */

TeamModel.belongsTo(MatchModel, { foreignKey: 'homeTeamGoals', as: 'homeMatches' });
TeamModel.belongsTo(MatchModel, { foreignKey: 'awayTeamGoals', as: 'awayMatches' });

MatchModel.hasMany(TeamModel, { foreignKey: 'homeTeamGoals', as: 'homeTeams' });
MatchModel.hasMany(TeamModel, { foreignKey: 'awayTeamGoals', as: 'awayTeams' });

export default MatchModel;
