module.exports = function(db, app) {
    app.post('/findUsers', async function(req, res){
        usersArray = [];
        var collection = db.collection('userData');
        users = await collection.find({}).toArray();
        for (i in users){
            usersArray.push({'username': users[i].username, 'role': users[i].role});
        }
        res.send(usersArray);
    })
}