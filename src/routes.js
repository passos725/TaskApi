import { Router } from 'express';
import UserController from './app/controllers/UserController';
import sessionController from './app/controllers/sessionController';

const routes = new Router();
routes.post('/Users', UserController.store);
routes.post('/sessions', sessionController.store);
routes.put('/Users', UserController.update);
export default routes;
