module.exports = function(db, app) {
    app.post('/findUsers', function(req, res){
        usersArray = [];
        var collection = db.collection('users');
        collection.find({}).toArray((err, users)=>{
            for (i in users){
                usersArray.push(users[i].username);
            }
            res.send(usersArray);
        })
    })
}