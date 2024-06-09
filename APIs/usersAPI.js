const exp = require('express')
const usersAPI = exp.Router()
const DBAccessMiddleware = require('../Middlewares/DBAccesMiddleware')


usersAPI.get('/',(req,res)=>{
    res.send("Hi, i am usersAPI.")
})

usersAPI.post('/createAccount',DBAccessMiddleware,async (req,res)=>{
    let responseFromDB = await req.usersCollection.find({"rool_no":req.body.roll_no}).toArray();

    console.log(req.body,req.body.roll_no)

    responseFromDB = responseFromDB[0]
    if(responseFromDB && responseFromDB.roll_no)
    {
        res.send({"status":true,"message":"rool_no_already_registered"})
    }
    else
    {
        responseFromDB = await req.usersCollection.insertOne({"rool_no":req.body.roll_no,"email":req.body.email,"password":req.body.password,"registered_clubs":[],"profilePic":""});
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
    let responseFromDB = await req.usersCollection.find({"rool_no":req.body.rool_no}).toArray();
    console.log(responseFromDB)

    responseFromDB = responseFromDB[0]
    

    res.send({"status":true,"message":responseFromDB})
})
usersAPI.post('/updateProfilePic',DBAccessMiddleware,async (req,res)=>{

    console.log("profile pic change",req.body)
    let responseFromDB = await req.usersCollection.updateOne({"rool_no":req.body.rool_no},{$set:{profilePic:req.body.url}})

    res.send(responseFromDB)
})

usersAPI.post('/followClub',DBAccessMiddleware,async (req,res)=>{

    let responseFromDB = await req.usersCollection.find({"rool_no":req.body.rool_no}).toArray()
    let data = responseFromDB[0];
    responseFromDB = responseFromDB[0];

    responseFromDB = responseFromDB.registered_clubs

    if(responseFromDB.includes(req.body.club))
    {
        res.send({status:false,"allClubs":responseFromDB})
    }
    else
    {
        responseFromDB = await req.usersCollection.updateOne({"rool_no":req.body.rool_no},{$push:{registered_clubs:req.body.club}})
        data = await req.usersCollection.find({"rool_no":req.body.rool_no}).toArray()
        data = data[0]

        res.send({"status":true,"allClubs":data.registered_clubs})
    }


    
})

usersAPI.get('/getClubUpdates',DBAccessMiddleware,async (req,res)=>{
    let responseFromDB = await req.eventsCollection.find({"active":true}).toArray()
    
    res.send(responseFromDB)
})

module.exports = usersAPI