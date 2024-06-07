const exp = require('express')
const usersAPI = exp.Router()
const DBAccessMiddleware = require('../Middlewares/DBAccesMiddleware')

usersAPI.get('/',(req,res)=>{
    res.send("Hi, i am usersAPI.")
})

usersAPI.post('/createAccount',DBAccessMiddleware,async (req,res)=>{
    let responseFromDB = await req.usersCollection.find({"rool_no":req.body.rool_no}).toArray();
    responseFromDB = responseFromDB[0]
    if(responseFromDB)
    {
        res.send({"status":true,"message":"rool_no_already_registered"})
    }
    else
    {
        responseFromDB = await req.usersCollection.insertOne({"rool_no":req.body.rool_no,"email":req.body.email,"password":req.body.password,"registered_clubs":[],"profilePic":""});
        res.send(responseFromDB)
    }
})

usersAPI.post('/checkCredentials',DBAccessMiddleware,async (req,res)=>{
    let responseFromDB = await req.usersCollection.find({"rool_no":req.body.rool_no}).toArray()
    if(responseFromDB[0])
    {
        // rool_no exists
        responseFromDB = responseFromDB[0]
        if(responseFromDB.password == req.body.password)
        {
            res.send({"status":true,"message":"login_success"})
        }
        else
        {
            res.send({"status":true,"message":"invalid_password"})
        }
    }
    else
    {
        res.send({"status":true,"message":"rool_no_not_found"})
    }
})

usersAPI.post('/getPersonalData',DBAccessMiddleware,async (req,res)=>{
    let responseFromDB = req.usersCollection.find({"rool_no":req.body.rool_no}).toArray();
    responseFromDB = responseFromDB[0]

    res.send({"status":true,"message":responseFromDB})
})

module.exports = usersAPI