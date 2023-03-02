const exp = require('express')
const routes = exp.Router()
const {login,createGoogleAccount,addSubject} = require('../controller/UserController')

routes.route('/').post(login)
routes.route('/createG').post(createGoogleAccount)
routes.route('/addsubject').post(addSubject)
module.exports = routes