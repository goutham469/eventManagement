const DBAccessMiddleware = (req,res,next)=>
{
    req.usersCollection = req.app.get('usersCollection')
    req.clubsCollection = req.app.get('clubsCollection')
    req.eventsCollection = req.app.get('eventsCollection')
    next();
}

module.exports = DBAccessMiddleware 