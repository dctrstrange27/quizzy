const exp = require('express')
const routes = exp.Router()
const {login,createGoogleAccount} = require('../controller/UserController')

routes.route('/').post(login)
routes.route('/createG').post(createGoogleAccount)

module.exports = routes