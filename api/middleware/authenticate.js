const jwt = require('jsonwebtoken')

const user = (req,res,next)=>{

    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token,'sd_s77&*')
        req.user = decode
        next()
    }
    catch(error){
        res.status(500).json({
            status:false,
            message:"authentication Failed"
        })
    }
}

module.exports = {user}