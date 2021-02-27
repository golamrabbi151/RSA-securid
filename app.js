const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')


const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const auth = require('./api/routes/auth')

app.use('/api',auth)



// mongo db connection
mongoose.connect('mongodb+srv://gulu:gulu123@cluster0.kacbg.mongodb.net/RSA-securid', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection

db.on('error',(err)=>{
    console.log(err.message)
})

db.once('open',()=>{
    console.log("Database Connection Successful")
})

const port = process.env.PORT || 4000

app.listen(port,()=>{
    console.log(`application is runnin on port ${port}`)
})
