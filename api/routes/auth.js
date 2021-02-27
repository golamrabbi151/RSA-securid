const express = require('express')
const router = express.Router()
const AuthController = require('../controller/AuthController')
const UserController = require('../controller/UserController')
const authenticate = require('../middleware/authenticate')

// Register 
router.post('/register',AuthController.Register)
router.post('/login',AuthController.Login)

router.get('/profile',authenticate.user,UserController.Index)


module.exports = router
