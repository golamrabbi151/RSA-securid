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
            AllUser: user
        })
    
    }catch(error){
        res.json({
            error
        })
    }
}


module.exports = {Index}