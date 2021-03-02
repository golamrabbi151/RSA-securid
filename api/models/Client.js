const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
    name: {
        type:String,
        required:true ,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    dob:{
        type:Date,
        trim:true
    },
    accountNumber:{
        type:Number,
        required:true,
        unique:true,
        trim:true
    },
    bankName:{
        type:String,
        required:true,
        trim:true
    },
    branch:{
        type:String,
        required:true,
        trim:true
    }

})



const Client = mongoose.model('Client',ClientSchema)

module.exports = Client


