const Admin = require("../models/Admin")
const User = require("../models/User")
const Client = require('../models/Client')
const NodeRSA = require("node-rsa")
const nodemailer = require("nodemailer")
const fs = require('fs')

const key = new NodeRSA({ b: 1024 })

// All User

const AllUser = async (req, res, next) => {

    try {

        const findAllUser = await User.find({})

        if (!findAllUser) {

            res.status(404).json({
                status: 0,
                message: "user not found"
            })
        }

        res.status(200).json({
            status: 0,
            message: "all user found",
            findAllUser
        })

    } catch (error) {
        return res.json({
            error: error
        })
    }

}

const AllClient = async (req, res, next) => {

    try {

        const findAllClient = await Client.find({})

        if (!findAllClient) {

            res.status(404).json({
                status: 0,
                message: "user not found"
            })
        }

        res.status(200).json({
            status: 0,
            message: "all user found",
            findAllClient
        })

    } catch (error) {
        return res.json({
            error: error
        })
    }

}

// Create Clients

const CreateClient = async (req, res) => {
    try {

        const {
            name,
            email,
            dob,
            accountNumber,
            bankName,
            branch
        } = req.body

        const newClient = await new Client({
            'name': name,
            'email': email,
            'dob': dob,
            'accountNumber': accountNumber,
            'bankName': bankName,
            'branch': branch
        })

        // encript client info
        const enc = key.encrypt(newClient, 'base64')
        // console.log(key.decrypt(enc,'utf8'))
        // Generate .md file


        var stream = fs.createWriteStream(`files/${name}.md`);
        stream.once('open',  function (fd) {
            stream.write(enc);
            stream.end();

        });




// ------------------------- email -------------------------

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'email',
                pass: 'password'
            }
        });
        
        const mailOptions = {
            from: 'golamrabbi5242@gmail.com', // sender address
            to: `${email}`, // list of receivers
            subject: 'test mail', // Subject line
            html: '<h1>this is a test mail.</h1>',// plain text body
            attachments:[
                { // use URL as an attachment
                  filename: `${name}.md`,
                  path: `files/${name}.md`
                }
              ]
        };
        
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log(err)
            else
                console.log(info);
        })






// ------------------------ end email ------------------





        





// Save Client
        const saveClient = await newClient.save()

        await Client.findOneAndUpdate({_id:newClient._id},{$set:{encriptInfo:enc}},{new:true}).exec()

        if (!saveClient) {
            return res.status(200).json({
                status: 0,
                message: "Client already exist !"
            })
            
        }
       
        res.status(201).json({
            status: 1,
            message: "Client Create Successful"
        })

    } catch (error) {
        // res.json({
        //     error: error.message
        // })
        console.log(error)
    }
}


module.exports = { AllUser, CreateClient,AllClient }