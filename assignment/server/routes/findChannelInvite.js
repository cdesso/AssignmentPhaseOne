module.exports = function(db, app) {
    app.post('/findChannelInvite', function(req, res){
        inviteGroup = req.body[0];
        inviteChannel = req.body[1];
        newUsers = [];

        var collection = db.collection('groups');
        collection.find({'groupName': inviteGroup}).toArray((err, group)=>{
            cID = group[0].channels.findIndex(channel => (channel.channelName == inviteChannel));
            var collection = db.collection('users');
            collection.find({}).toArray((err, users)=>{
                for (i in users){
                    if(group[0].channels[cID].members.findIndex(member => (member.username == users[i].username)) == -1){
                        newUsers.push(users[i].username)
                    }
                }
                res.send(newUsers);
            })
        })
    })
    
}