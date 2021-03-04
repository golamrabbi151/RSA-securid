const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    accountNumber:{
        type:Number,
        required:true,
        unique:true
    },
    randToken:{
        type:Number,
        
        trim:true,
        default:0
    },
    isActive:{
        type:String,
        default:'inactive',
        enum:['inactive','active']
    }

})

const User = mongoose.model('User',UserSchema)
module.exports = User