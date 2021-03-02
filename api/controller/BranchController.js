const Branch = require('../models/Branch')


// All Branch

const Index = async (req,res,next)=>{

    try{
        const allBranch = await Branch.find()
        if(allBranch){
            res.status(200).json({
                status:true,
               branch:allBranch
            })
        }

    }catch(error){
        res.json({
            error
        })
    }

}



// Create New Branch
const Create = async (req,res,next)=>{
        try{
            const {name} = req.body
            const findBrnach = await Branch.findOne({name})
            if(findBrnach){
                res.status(409).json({
                    status:false,
                    message:"Branch Already Exist!"
                })
            }
            const newBranch = new Branch({name})
            newBranch.save()
            res.status(201).json({
                status:true,
                message:"Branch Created Successful"
            })

        }catch(error){
            res.json({
                error
            })
        }
}


module.exports = {Index,Create}