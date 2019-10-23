import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import FileController from './app/controllers/FileController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CkeckinController from './app/controllers/CheckinController';
import AnswerController from './app/controllers/AnswerController';
import HelpOrderController from './app/controllers/HelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.post('/students/:idStudent/checkins', CkeckinController.store);
routes.get('/students/:idStudent/checkins', CkeckinController.index);

routes.post('/students/:idStudent/help-orders', HelpOrderController.store);
routes.get('/students/:idStudent/help-orders', HelpOrderController.index);

/* Todas as rotas para baixo terão o token validados */
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.get('/students', StudentController.index);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/registrations', RegistrationController.store);
routes.get('/registrations', RegistrationController.index);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

routes.get('/help-orders', AnswerController.index);
routes.put('/help-orders/:id/answer', HelpOrderController.update);

export default routes;
