const Admin = require("../models/Admin")
const User = require("../models/User")
const Client = require('../models/Client')
const NodeRSA = require("node-rsa")
const fs = require('fs')
 
const key = new NodeRSA({b: 1024})

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
       const enc = key.encrypt(newClient,'base64')
       console.log(enc)
       console.log("decript: ")
        // console.log(key.decrypt(enc,'utf8'))


        var stream = fs.createWriteStream("my_file.txt");
        stream.once('open', function(fd) {
          stream.write(enc);
         
          stream.end();
        });




    const saveClient = await newClient.save()
        
        if(saveClient){
            res.status(201).json({
                status:1,
                message:"Client Create Successful"
            })
        }
        res.status(200).json({
            status:0,
            message:"Client already exist !"
        })

    }catch(error){
        res.json({
           error: error.message
        })
    }
}


module.exports = {AllUser,CreateClient}