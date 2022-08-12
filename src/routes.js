import { Router } from 'express';
import UserController from './app/controllers/UserController';
import sessionController from './app/controllers/sessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
routes.post('/users', UserController.store);
routes.post('/sessions', sessionController.store);

// Routes bellow this one needs auth token
routes.use(authMiddleware);
routes.put('/users', UserController.update);
export default routes;
