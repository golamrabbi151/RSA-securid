const User = require('../models/User')

// user informations
const Index = async (req,res) => {
    console.log(req.user)
    
// try{
    let user = await User.findOne({email:req.user.email})
    if(user.length){
        return res.status(404).json({ status: false, message: 'User not found' })
    }
    res.status(200).json({
        status: true,
        AllUser: user
    })

// }catch(error){
//     res.status(404).json({
//         status:false,
//         message:"users not found"
//     })
// }
}


module.exports = {Index}