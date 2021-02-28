const jwt = require("jsonwebtoken")

const isAdmin = async (req,res,next) =>{
    try{
        const token = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(token,"34xxx&")

        if(decode.role === 'admin' || decode.role === 'superAdmin'){
            next()
        }else{
            return res.status(401).json({
                status:false,
                message:"You Have No permission to Access !"
            })
        }
     

    }
    catch(error){
        res.status(404).json({
            status:false,
            message:"Authentication Failed"
        })
    }
}

module.exports = {isAdmin}