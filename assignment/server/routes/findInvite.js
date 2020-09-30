module.exports = function(db, app) {
    app.post('/findInvite', function(req, res){
        inviteGroup = req.body[0];
        newUsers = [];
        var collection = db.collection('groups');
        collection.find({'groupName': inviteGroup}).toArray((err, group)=>{
            var collection = db.collection('users');
            collection.find({}).toArray((err, users)=>{
                for (i in users){
                    if (!group[0].members.includes(users[i].username)){
                        newUsers.push(users[i].username)
                    }
                }
                res.send(newUsers);
            })
        })
    })
}