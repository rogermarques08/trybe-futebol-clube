import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import Teams from '../database/models/team.model';

import { Response } from 'superagent';
import { app } from '../app';
import teamsMock from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(Teams, 'findAll').resolves(teamsMock as Teams[]);
  });

  afterEach(() => {
    (Teams.findAll as sinon.SinonStub).restore();
  });

  it('Testa se é possível solicitar todos os times (GET /teams)', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  // it('Testa se é possível solicitar um time pelo id (GET /teams/:id)', async () => {
  //   sinon.stub(Teams, 'findByPk').resolves(teamsMock[0] as Teams);
  //   chaiHttpResponse = await chai.request(app).get('/teams');

  //   expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock[0]);
  //   expect(chaiHttpResponse.status).to.be.equal(200);
  // });
});
