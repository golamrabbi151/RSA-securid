const User = require('../models/User')
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// User Registration
const Register = async (req, res, next) => {
    try {
        let {
            name,
            email,
            password,
            accountNumber
        } = req.body

        bcrypt.hash(password, 10, function (err, hashedPassword) {
            if (err) {
                res.status(500).json({
                    error: err
                })
            }

            let user = new User({
                'name': name,
                'email': email,
                'password': hashedPassword,
                'accountNumber': accountNumber
            })

            user.save()
            res.status(201).json({
                status: true,
                message: 'User Create Successful'
            })

        })
    } catch (error) {
        res.json({
            error: error.message
        })
    }
}

// User Login

const Login = async (req, res, next) => {

    try {

        let email = req.body.email
        let password = req.body.password

        let user = await User.findOne({ email })

        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    res.status(400).json({
                        error: err.message
                    })
                }
                if (result) {
                    
                    let token = jwt.sign({ email: user.email }, 'sd_s77&*', { expiresIn: '1h' })
                    res.status(200).json({
                        status: true,
                        message: "Login Successful",
                        token
                    })
                } else {
                    res.status(404).json({
                        status: false,
                        message: "password not match"
                    })
                }
            })
        } else {
            res.status(404).json({
                status: false,
                message: "user not found"
            })
        }
    } catch (error) {
        res.json({
            error
        })
    }
}


// Admin Register 

const AdminRegister = async (req,res,next) =>{

    try{

        let {
            name,
            email,
            password 
        } = req.body

        bcrypt.hash(password,10,function(err,hashedPassword){
            if(err){
                res.status(500).json({
                    status:false,
                    message:`${err.message}`
                })
            }

            let CreateAdmin = new Admin({
                'name':name,
                'email':email,
                'password':hashedPassword
            })

             CreateAdmin.save()

            res.status(201).json({
                status:true,
                message:"Admin Create Successful !"
            })

        })

    }catch(error){
        res.status(500).json({ 
            status:false,
            message:"Internal Sever Error"
        })
    }
}

// Admin Login

const AdminLogin = async (req,res,next) =>{
    try{
        let {email,password}= req.body
        
        let checkAdmin = await Admin.findOne({email})
        
        if(checkAdmin){
            
            bcrypt.compare(password,checkAdmin.password,function(err,result){
                if(err){
                    res.status(500).json({
                        status:false,
                        message:err
                    })
                }
                if(result){
                    console.log(result)
                    let token = jwt.sign({name:checkAdmin.name, email:checkAdmin.email, role:checkAdmin.role},"34xxx&",{expiresIn:'1h'})
                    res.status(200).json({
                        status:true,
                        message:"Login Successful !",
                        token
                    })

                }else{
                    res.status(404).json({
                        status:false,
                        message:"Password Not Match"
                    })
                }
            })

        }else{
            res.status(404).json({
                status:false,
                message:"Email Not Match"
            })
        }

    }catch(error){
        res.json({
            status:false,
            message:error 
        })
        next()
    }
    


}


module.exports = {
    Register,
    Login,
    AdminRegister,
    AdminLogin
}