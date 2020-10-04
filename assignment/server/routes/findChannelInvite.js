module.exports = function(db, app) {
    app.post('/findChannelInvite', async function(req, res){
        inviteGroup = req.body[0];
        inviteChannel = req.body[1];
        newUsers = [];
        var collection = db.collection('groups');
        var collection2 = db.collection('users');

        group = await collection.find({'groupName': inviteGroup}).toArray();
        users = await collection2.find({}).toArray();

        cID = group[0].channels.findIndex(channel => (channel.channelName == inviteChannel));
        for (i in users){
            if(group[0].channels[cID].members.findIndex(member => (member.username == users[i].username)) == -1){
                newUsers.push(users[i].username);
            }
        }
        res.send(newUsers);
    })
    
}