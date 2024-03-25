const express = require('express')
const routes = express.Router()
const {login,createGoogleAccount,addSubject,getSubject,getQuestion,getUsers,checkAccessList,deleteSubj} = require('../controller/UserController')

routes.route('/').post(login)
routes.route('/getUsers').get(getUsers)
routes.route('/createG').post(createGoogleAccount)
routes.route('/addsubject').post(addSubject)
routes.route('/getSubject').get(getSubject)
routes.route('/getQuestion').post(getQuestion)
routes.route('/checkAccessList').post(checkAccessList)
routes.route('/deleteSubj').post(deleteSubj)

module.exports = routes