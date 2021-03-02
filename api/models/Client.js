const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
    name: {
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    dob:{
        
    },
    accountNumber:{
        type:Number,
        required:true,
        unique:true
    }
})