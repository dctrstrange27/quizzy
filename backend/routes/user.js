const exp = require('express')
const routes = exp.Router()
const {login,createGoogleAccount,addSubject,getSubject,getQuestion} = require('../controller/UserController')

routes.route('/').post(login)
routes.route('/createG').post(createGoogleAccount)
routes.route('/addsubject').post(addSubject)
routes.route('/getSubject').post(getSubject)
routes.route('/getQuestion').post(getQuestion)
module.exports = routes