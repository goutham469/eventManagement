const exp = require('express')
const path = require('path')
const app = exp();
const cors = require('cors')
// const cros = require("cros")
const mongodb_client = require('mongodb').MongoClient

require('dotenv').config()

const usersAPI = require('./APIs/usersAPI')
const clubsAPI = require('./APIs/clubsAPI')

app.use(exp.json())
app.use(cors())


mongodb_client.connect(`${process.env.MONGODB_CONNECTION_URL}`).then((client)=>{
    const DB = client.db('event_management')
    const usersCollection = DB.collection('users');
    const clubsCollection = DB.collection('clubs');
    const eventsCollection = DB.collection('events');

    app.set('usersCollection',usersCollection)
    app.set('clubsCollection',clubsCollection)
    app.set('eventsCollection',eventsCollection)
    console.log("mongodb connection successful")
})


app.get('/',(req,res)=>{
    res.send("hi, goutham")
})

app.use('/user',usersAPI)
app.use('/clubs',clubsAPI)

app.listen(`${process.env.PORT}`,()=>{console.log(`server running on port ${process.env.PORT}`)})