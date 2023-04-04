import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import Teams from '../database/models/team.model';

import { Response } from 'superagent';
import { app } from '../app';
import { awayLeaderboardMock, homeLeaderboardMock, leaderboardMock } from './mocks/leaderboard.mock';
import teamsMock from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  it('Testa se é possível requisitar a leaderboard (GET /leaderboard)', async () => {
    sinon.stub(Teams, 'findAll').resolves(teamsMock as Teams[]);

    chaiHttpResponse = await chai.request(app).get('/leaderboard');

    expect(chaiHttpResponse.body).to.be.deep.equal(leaderboardMock);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Testa se é possível requisitar a home leaderboard (GET /leaderboard/home)', async () => {
    sinon.stub(Teams, 'findAll').resolves(teamsMock as Teams[]);

    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

    expect(chaiHttpResponse.body).to.be.deep.equal(homeLeaderboardMock);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Testa se é possível requisitar a away leaderboard (GET /leaderboard/away)', async () => {
    sinon.stub(Teams, 'findAll').resolves(teamsMock as Teams[]);

    chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

    expect(chaiHttpResponse.body).to.be.deep.equal(awayLeaderboardMock);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

});
