const Admin = require("../models/Admin")
const User = require("../models/User")
const Client = require('../models/Client')


// All User

const AllUser = async (req,res,next) => {

    try{

        
        const findAllUser = await User.find({})

        if(findAllUser){
            res.status(200).json({
                findAllUser
            })
        }

        res.status(404).json({
            status:0,
            message:"user not found"
        })
    
    }catch(error){
        return res.json({
            error:error
        })
    }

}

// Create Clients

const CreateClient = async (req,res,next) =>{
    try{

        const {
            name,
            email,
            dob,
            accountNumber,
            bankName,
            branch
        }=req.body

        const newClient = await new Client({
            'name':name,
            'email':email,
            'dob':dob,
            'accountNumber':accountNumber,
            'bankName':bankName,
            'branch':branch
        })

        newClient.save()
        res.status(201).json({
            status:1,
            message:"Client Create Successful"
        })

    }catch(error){
        res.json({
            error
        })
    }
}


module.exports = {AllUser,CreateClient}