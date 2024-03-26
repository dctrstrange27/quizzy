import express, { Router } from 'express';
import {
  login,
  createGoogleAccount,
  addSubject,
  getSubject,
  getQuestion,
  getUsers,
  checkAccessList,
  deleteSubj
} from '../controller/UserController';

const routes: Router = express.Router();

routes.route('/').post(login);
routes.route('/getUsers').get(getUsers);
routes.route('/createG').post(createGoogleAccount);
routes.route('/addsubject').post(addSubject);
routes.route('/getSubject').get(getSubject);
routes.route('/getQuestion').post(getQuestion);
routes.route('/checkAccessList').post(checkAccessList);
routes.route('/deleteSubj').post(deleteSubj);

export default routes;
