module.exports = function(db, app) {
    app.post('/findChannelInvite', async function(req, res){
        inviteGroup = req.body[0];
        inviteChannel = req.body[1];
        newUsers = [];
        var collection = db.collection('groups');
        var collection2 = db.collection('users');

        // Find specific group and store in group variable, find all users and store in users variable.
        group = await collection.find({'groupName': inviteGroup}).toArray();
        users = await collection2.find({}).toArray();

        // Find the channel index of the specific channel
        cID = group[0].channels.findIndex(channel => (channel.channelName == inviteChannel));
        // Check which users do not exist in the channel and append to newUsers list
        for (i in users){
            if(group[0].channels[cID].members.findIndex(member => (member.username == users[i].username)) == -1){
                newUsers.push(users[i].username);
            }
        }
        res.send(newUsers);
    })
    
}