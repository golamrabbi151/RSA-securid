const Admin = require("../models/Admin")
const User = require("../models/User")

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
            status:false,
            message:"user not found"
        })
    
    }catch(error){
        return res.json({
            error:error
        })
    }

}

module.exports = {AllUser}