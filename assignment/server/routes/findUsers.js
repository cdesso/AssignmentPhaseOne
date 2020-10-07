module.exports = function(db, app) {
    app.post('/findUsers', async function(req, res){
        usersArray = [];
        var collection = db.collection('userData');
        // Find all users in DB
        users = await collection.find({}).toArray();
        // Get the username and the role of each user and append to usersArray
        for (i in users){
            usersArray.push({'username': users[i].username, 'role': users[i].role});
        }
        res.send(usersArray);
    })
}