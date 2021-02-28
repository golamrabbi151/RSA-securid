const express = require('express')
const router = express.Router()
const AuthController = require('../controller/AuthController')
const UserController = require('../controller/UserController')
const AdminController = require('../controller/AdminController')
const authenticate = require('../middleware/authenticate')
const adminMiddleware = require('../middleware/adminMiddleware')

// Register 
router.post('/register',AuthController.Register)
router.post('/login',AuthController.Login)

// Admin Register
router.post('/admin/register',AuthController.AdminRegister)
router.post('/admin/login',AuthController.AdminLogin)
// all user
router.get('/admin/alluser',adminMiddleware.isAdmin,AdminController.AllUser)

// User profile
router.get('/profile',authenticate.user,UserController.Index)


module.exports = router
