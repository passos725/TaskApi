import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import sessionController from './app/controllers/sessionController';
import TaskController from './app/controllers/TaskController';

const routes = new Router();
routes.post('/users', UserController.store);
routes.post('/sessions', sessionController.store);

// Routes bellow this one needs auth token
routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);
routes.put('/tasks/:task_id', TaskController.update);
routes.delete('/tasks/:task_id', TaskController.delete);
export default routes;
