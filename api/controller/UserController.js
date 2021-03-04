const User = require('../models/User')
const Client = require('../models/Client')

// user informations
const Index = async (req,res) => {
    // console.log(req.user)
    try{
        const {email} = req.user
        let user = await User.findOne({email:email})
        if(user.length){
            return res.status(404).json({ status: false, message: 'User not found' })
        }
        res.status(200).json({
            status: 1,
            user: user
        })
    
    }catch(error){
        res.json({
            error
        })
    }
}


const makeRandomToken = async (req,res) =>{
    try{
        const {randToken}=req.body
        // console.log(randToken)
       const {email} = req.user
        const userId = await User.findOne({email:email})
        // console.log(userId)
        if(!userId){
            res.status(500).json({
                status:0,
                message:"server Error"
            })
        }
       const updateToken = await User.findOneAndUpdate({_id: userId._id}, {$set: {randToken: randToken}}, { new: true }).exec()
    //    console.log(updateToken)
    // console.log(updateToken)
    if(!updateToken){
        res.status(500).json({
            status:0,
            message:"server Error"
        })
    }
        res.status(201).json({
            status:1,
            message:"Token Update Successful !",
        })


    }catch(error){
        console.log(error)
    }
}

const ChekcProfile = async (req,res,next)=>{
    try{
        
        const {encriptInfo}=req.body
        const {email} = req.user

        const checkUser = await Client.findOne({encriptInfo:encriptInfo})
        if(checkUser){
            const fndUsr = await User.findOne({email:email})
            if(fndUsr.isActive=='active'){
                res.status(203).json({
                    status:0,
                    message:"user already Active"
                })
                return
            }
            const activeusr = await User.findOneAndUpdate({_id:fndUsr._id},{$set:{isActive:'active'}}).exec()
            if(!activeusr){
                res.status(203).json({
                    status:0,
                    message:"Internal Server Error"
                })
            }
            res.status(201).json({
                status:1,
                message:"User Activated"
            })
            return

        }
        else{
            res.status(204).json({
                status:0,
                message:'user not valid'
            })
            return
        }


    }catch(error){
        console.log(error)
    }
}


module.exports = {Index,makeRandomToken,ChekcProfile}