module.exports = function(db, app) {
    app.post('/findInvite', async function(req, res){
        inviteGroup = req.body[0];
        newUsers = [];
        var collection = db.collection('groups');
        var collection2 = db.collection('users');
        group = await collection.find({'groupName': inviteGroup}).toArray();
        users = await collection2.find({}).toArray();
        for (i in users){
            if (!group[0].members.includes(users[i].username)){
                newUsers.push(users[i].username)
            }
        }
        res.send(newUsers);
    })
}