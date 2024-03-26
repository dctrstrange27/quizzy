"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const routes = express_1.default.Router();
routes.route('/').post(UserController_1.login);
routes.route('/getUsers').get(UserController_1.getUsers);
routes.route('/createG').post(UserController_1.createGoogleAccount);
routes.route('/addsubject').post(UserController_1.addSubject);
routes.route('/getSubject').get(UserController_1.getSubject);
routes.route('/getQuestion').post(UserController_1.getQuestion);
routes.route('/checkAccessList').post(UserController_1.checkAccessList);
routes.route('/deleteSubj').post(UserController_1.deleteSubj);
exports.default = routes;
