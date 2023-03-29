import * as express from 'express';
import loginController from '../controllers/login.controller';

const loginRoutes = express.Router();

loginRoutes.post('/', loginController.login);

export default loginRoutes;
