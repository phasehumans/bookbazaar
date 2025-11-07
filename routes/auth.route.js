const {Router} = require('express')
const authRouter = Router()
const {loginUser, registerUser} = require('../controllers/auth.controllers')


authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.get('/me')

module.exports = {
    authRouter : authRouter
}