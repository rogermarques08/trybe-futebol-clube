import * as express from 'express';
import loginController from '../controllers/login.controller';
import validateJWT from '../middleware/validateJWT';

const loginRoutes = express.Router();

loginRoutes.post('/', loginController.login);
loginRoutes.get('/role', validateJWT, loginController.getUserRole);

export default loginRoutes;
