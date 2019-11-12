import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CkeckinController from './app/controllers/CheckinController';
import AnswerController from './app/controllers/AnswerController';
import HelpOrderController from './app/controllers/HelpOrderController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateHelpOrderStore from './app/validators/HelpOrderStore';
import validateHelpOrderUpdate from './app/validators/HelpOrderUpdate';
import validatePlanStore from './app/validators/PlanStore';
import validatePlanUpdate from './app/validators/PlanUpdate';
import validateRegistrationStore from './app/validators/RegistrationStore';
import validateRegistrationUpdate from './app/validators/RegistrationUpdate';
import validateStudentStore from './app/validators/StudentStore';
import validateStudentUpdate from './app/validators/StudentUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);

routes.post('/students/:idStudent/checkins', CkeckinController.store);
routes.get('/students/:idStudent/checkins', CkeckinController.index);

routes.post(
  '/students/:idStudent/help-orders',
  validateHelpOrderStore,
  HelpOrderController.store
);
routes.get('/students/:idStudent/help-orders', HelpOrderController.index);

/* Todas as rotas para baixo terão o token validados */
routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

routes.post('/students', validateStudentStore, StudentController.store);
routes.put(
  '/students/:idStudent',
  validateStudentUpdate,
  StudentController.update
);
routes.get('/students', StudentController.index);
routes.get('/students/:idStudent', StudentController.show);
routes.delete('/students/:idStudent', StudentController.delete);

routes.get('/plans', PlanController.index);
routes.get('/plans/:idPlan', PlanController.show);
routes.post('/plans', validatePlanStore, PlanController.store);
routes.put('/plans/:idPlan', validatePlanUpdate, PlanController.update);
routes.delete('/plans/:idPlan', PlanController.delete);

routes.post(
  '/registrations',
  validateRegistrationStore,
  RegistrationController.store
);
routes.get('/registrations', RegistrationController.index);
routes.put(
  '/registrations/:idRegistration',
  validateRegistrationUpdate,
  RegistrationController.update
);
routes.delete('/registrations/:idRegistration', RegistrationController.delete);

routes.get('/help-orders', AnswerController.index);
routes.put(
  '/help-orders/:idHelpOrder/answer',
  validateHelpOrderUpdate,
  HelpOrderController.update
);

export default routes;
