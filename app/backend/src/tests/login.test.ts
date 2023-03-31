import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');


import { Response } from 'superagent';
import { app } from '../app';
import UserModel from '../database/models/user.model';
import { invalidUser } from './mocks/login.mock';
import matchesMock from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  let chaiHttpResponse: Response;

  // beforeEach(async () => {
  //   sinon.stub(Teams, 'findAll').resolves(teamsMock as Teams[]);
  // });

  afterEach(() => {
     sinon.restore();
  });

  it('Verifica se é possível fazer login(POST /login )', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(matchesMock.user);

    const token = chaiHttpResponse.body.token;

    expect(chaiHttpResponse.body.token).to.be.equal(token);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Verifica se não é possível fazer login com login ou senha inválidos(POST /login )', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(invalidUser);

    expect(chaiHttpResponse.body.message).to.be.equal('Invalid email or password');
    expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('Verifica se não é possível fazer login caso o usuário não seja encontrado(POST /login)', async () => {
    sinon.stub(UserModel, 'findOne').resolves(null)  

    chaiHttpResponse = await chai.request(app).post('/login').send(matchesMock.user);

    console.log(chaiHttpResponse.body)

    expect(chaiHttpResponse.body.message).to.be.equal('Invalid email or password');
    expect(chaiHttpResponse.status).to.be.equal(401);
  });

  it('Verifica se é possível solicitar a role do user(GET /login/role)', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(matchesMock.user);

    const token = chaiHttpResponse.body.token;
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('Authorization', token)
      .send();

    expect(chaiHttpResponse.body.role).to.be.equal('admin');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});
