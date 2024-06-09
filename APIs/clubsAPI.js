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

clubsAPI.post('/getClubData',DBAccessMiddleware,async (req,res)=>{
    let responseFromDB = await req.clubsCollection.find({"clubId":req.body.clubId}).toArray()

    res.send({"status":true,"data":responseFromDB[0]})
})
clubsAPI.post('/getClubPosts',DBAccessMiddleware,async (req,res)=>{
    let responseFromDB = await req.eventsCollection.find({"clubId":req.body.clubId}).toArray()

    res.send({"status":true,"data":responseFromDB})
})

clubsAPI.post('/createClub',DBAccessMiddleware,async (req,res)=>{
    let responseFromDB = await req.clubsCollection.insertOne({
        "clubId":req.body.clubId,
        "clubName":req.body.clubName,
        "volunteers":[],
        "clubMembers":[],
        "gallery":[],
        "description":req.body.description,
        "motto":req.body.motto,
        "profilePic":"",
        "email":"",
        "data1":{},
        "posts":[],
        "password":req.body.password
    })
    res.send(responseFromDB)
})

clubsAPI.post('/createAPost',DBAccessMiddleware,async (req,res)=>{
    let date = Date.now();
    console.log(date)
    let responseFromDB = await req.eventsCollection.insertOne({
        "postId":date,
        "subject":req.body.subject,
        "clubId":req.body.clubId,
        "clubName":req.body.clubName,
        "description":req.body.description,
        "posters":req.body.posters,
        "links":req.body.links,
        "postedOn":getDate,
        "lastDate":req.body.lastDate,
        "contactDetails":req.body.contactDetails,
        "active":true,
        "data1":{}
    })

    let responseFromDB2 = await req.clubsCollection.updateOne({"clubId":req.body.clubId},{$push:{posts:date}})

    res.send(responseFromDB)
})

clubsAPI.post('/checkCredentials',DBAccessMiddleware,async (req,res)=>{
    let responseFromDB = await req.clubsCollection.find({"clubId":req.body.clubId}).toArray()
    if(responseFromDB[0])
        {
            // clubId exists
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
            res.send({"status":true,"message":"club_Id_not_found"})
        }
})

clubsAPI.post('/getClubName',DBAccessMiddleware,async (req,res)=>{
    let responseFromDB = await req.clubsCollection.find({"clubId":req.body.clubId}).toArray();
    responseFromDB = responseFromDB[0]

    if(responseFromDB)
    {
        res.send({"name":responseFromDB.clubName})
    }
    else
    {
        res.send({"name":"null"})
    }

})



module.exports = clubsAPI