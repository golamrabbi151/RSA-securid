const express = require('express')
const router = express.Router()
const AuthController = require('../controller/AuthController')
const UserController = require('../controller/UserController')
const AdminController = require('../controller/AdminController')
const authenticate = require('../middleware/authenticate')
const adminMiddleware = require('../middleware/adminMiddleware')
const BranchController = require('../controller/BranchController')


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
// Active User by encripted file data
router.post('/active/profile',authenticate.user,UserController.ChekcProfile)
// create Random Token
router.post('/create/token',authenticate.user,UserController.makeRandomToken)

// Branch 
//create
router.post('/admin/branch/create',adminMiddleware.isAdmin,BranchController.Create)
//All Branch
router.get('/admin/branch/all',BranchController.Index)

// Clients
//create
router.post('/admin/client/create',adminMiddleware.isAdmin,AdminController.CreateClient)
// all user
router.get('/admin/allclient',adminMiddleware.isAdmin,AdminController.AllClient)


module.exports = router
