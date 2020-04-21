import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import AddressController from './app/controllers/AddressController';

import PeopleController from './app/controllers/PeopleController';
import UserController from './app/controllers/UserController';
import UserAvatarController from './app/controllers/UserAvatarController';

import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import AuthMiddleware from './app/middlewares/auth';

import GroupController from './app/controllers/GroupController';
import GroupUserController from './app/controllers/GroupUserController';
import PrivacyController from './app/controllers/PrivacyController';

import SelectCityController from './app/controllers/SelectCityController';
import SelectStateController from './app/controllers/SelectStateController';
import SearchCityController from './app/controllers/SearchCityController';

import validateUserStore from './app/validators/UserStore';

import validateAddressStore from './app/validators/AddressStore';
import validateAddressUpdate from './app/validators/AddressUpdate';

import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';

import AcceptRegulationController from './app/controllers/AcceptRegulationController';
const routes = new Router();
const upload = multer(multerConfig);

import TesteController from './app/controllers/TesteController';

/**
 * validar email do user
 *
 */

routes.get('/', TesteController.index);
routes.get('/p', TesteController.get);

routes.post('/sessions', validateSessionStore, SessionController.store);



routes.put('/privacy', PrivacyController.update);
routes.get('/accept_regulation', AcceptRegulationController.store);

routes.use(AuthMiddleware);

/**
 * criar user
 */

routes.get('/users', UserController.index);
routes.post('/users', validateUserStore, UserController.store);
routes.put('/users', validateUserUpdate, UserController.update);
routes.put('/usersavatar', UserAvatarController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/addresses/:recipient_id', AddressController.index);
routes.post('/addresses', validateAddressStore, AddressController.store);
routes.put('/addresses/:id', validateAddressUpdate, AddressController.update);

//rota para preencher os select city
routes.get('/cities/:state_id/select', SelectCityController.index);

//rota para preencher os select city
routes.get('/cities/:state_id/select/edit', SearchCityController.index);

//rota para preencher os select deliveryman
routes.get('/states/select', SelectStateController.index);


//lista somente as pessoas, com nome e email
routes.get('/people', PeopleController.index);

routes.get('/groups', GroupController.index);
routes.post('/groups', GroupController.store);

routes.post('/groups/users', GroupUserController.store);
routes.put('/groups/users/edit', GroupUserController.update);

routes.post('/files', upload.single('file'), FileController.store);
routes.put('/files', upload.single('file'), FileController.update);

export default routes;
