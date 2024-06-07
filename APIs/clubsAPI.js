let exp = require('express')
const DBAccessMiddleware = require('../Middlewares/DBAccesMiddleware')


const getDate = require('../Functions/getDate')

const clubsAPI = exp.Router()

clubsAPI.get('/',(req,res)=>{
    res.send("Hi i am clubsAPI.")
})

clubsAPI.get('/getAllGroups',DBAccessMiddleware,async (req,res)=>{
    let responseFromDB = await req.clubsCollection.find().toArray()

    res.send({"status":true,"data":responseFromDB})
})

clubsAPI.post('/getGroupData',DBAccessMiddleware,async (req,res)=>{
    let responseFromDB = await req.clubsCollection.find({"club_id":req.body.clubId}).toArray()

    res.send({"status":true,"data":responseFromDB})
})

clubsAPI.post('/createClub',DBAccessMiddleware,async (req,res)=>{
    let responseFromDB = await req.clubsCollection.insertOne({
        "clubId":req.body.clubId,
        "clubName":req.body.clubName,
        "volunteers":[],
        "clubMembers":[],
        "gallery":[],
        "description":[],
        "motto":[],
        "profilePic":"",
        "email":"",
        "data1":{},
        "posts":[],
        "password":req.body.password
    })
    res.send(responseFromDB)
})

clubsAPI.post('/createAPost',DBAccessMiddleware,async (req,res)=>{
    let responseFromDB = await req.eventsCollection.insertOne({
        "subject":req.body.subject,
        "clubId":req.body.clubId,
        "clubName":req.body.clubName,
        "description":req.body.description,
        "links":req.body.links,
        "postedOn":getDate,
        "lastDate":req.body.lastDate,
        "contactDetails":req.body.contactDetails
    })

    res.send(responseFromDB)
})

clubsAPI.post('/checkCredentials',DBAccessMiddleware,async (req,res)=>{
    let responseFromDB = await req.clubsCollection
})



module.exports = clubsAPI