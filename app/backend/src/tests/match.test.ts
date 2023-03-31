import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import MatchModel from '../database/models/match.model';
import matchesMock from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  it('Testa se é possível solicitar todos as partidas (GET /matches)', async () => {
    sinon
      .stub(MatchModel, 'findAll')
      .resolves(matchesMock.matches as unknown as MatchModel[]);

    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock.matches);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Testa se é possível solicitar todos as partidas em andamento (GET /matches?inProgress=true)', async () => {
    const inProgressMatches = matchesMock.matches.filter((match) => match.inProgress);

    sinon
      .stub(MatchModel, 'findAll')
      .resolves(inProgressMatches as unknown as MatchModel[]);

    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

    expect(chaiHttpResponse.body).to.be.deep.equal(inProgressMatches);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Testa se é possível mudar o status de progresso de uma partida(PATCH /matches/:id/finish)', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    const token = chaiHttpResponse.body.token;
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', token)
      .send();

    sinon.stub(MatchModel, 'update').resolves([1]);

    expect(chaiHttpResponse.body.message).to.be.deep.equal('Finished');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Testa se é possível atualizar um partida (PATCH /matches/1 )', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(matchesMock.user);

    const token = chaiHttpResponse.body.token;
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', token)
      .send(matchesMock.updateMatch);

    sinon.stub(MatchModel, 'update').resolves([1]);

    expect(chaiHttpResponse.body.message).to.be.equal('Match updated!');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Testa se é possível criar uma nova partida (POST /matches )', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(matchesMock.user);

    const token = chaiHttpResponse.body.token;
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', token)
      .send(matchesMock.createMatch);

    sinon.stub(MatchModel, 'create').resolves(matchesMock.createdMatch as MatchModel);

    expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock.createdMatch);
    expect(chaiHttpResponse.status).to.be.equal(201);
  });
  // corrigir teste ^^^

  it('Testa se não é possível criar uma nova partida com dois times iguais(POST /matches )', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(matchesMock.user);

    const token = chaiHttpResponse.body.token;
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', token)
      .send(matchesMock.sameId);

    expect(chaiHttpResponse.body.message).to.be.equal('It is not possible to create a match with two equal teams');
    expect(chaiHttpResponse.status).to.be.equal(422);
  });

  it('Testa se não é possível criar uma nova partida caso um time não exista(POST /matches )', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(matchesMock.user);

    const token = chaiHttpResponse.body.token;
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', token)
      .send(matchesMock.invalidTeam);

    expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
    expect(chaiHttpResponse.status).to.be.equal(404);
  });
});
