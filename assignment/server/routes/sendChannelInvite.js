// var fs = require('fs');

// module.exports = function(req, res) {
//     user = req.body[0];
//     inviteGroup = req.body[1];
//     inviteChannel = req.body[2];
//     fs.readFile('./data/groups.json', 'utf8', function(err, data){
//         if (err) throw err;
//         let groups = JSON.parse(data);
//         let gID = groups.findIndex(group => (group.groupName == inviteGroup));
//         if (!groups[gID].members.includes(user)){
//             groups[gID].members.push(user);
//         }
//         let cID = groups[gID].channels.findIndex(channel => (channel.channelName == inviteChannel));
//         groups[gID].channels[cID].members.push({"username": user});
//         console.log(groups[gID].channels[cID].members);

//         fs.writeFile('./data/groups.json', JSON.stringify(groups), 'utf8', function(err){
//             if (err) throw err;
//             res.send(true);
//         })
//     })
// }


module.exports = function(db, app) {
    app.post('/sendChannelInvite', async function(req, res){
        uName = req.body[0];
        inviteGroup = req.body[1];
        inviteChannel = req.body[2];
        var collection = db.collection('groups');
        try {
            await collection.updateOne({'groupName': inviteGroup}, {'$addToSet': {'members': uName}});
            await collection.updateOne(
                {'$and': [
                    {'groupName': inviteGroup}, 
                    {'channels.channelName': inviteChannel}
                ]}, 
                {'$push':{
                    'channels.$.members': {'username': uName}
                }});
        } catch (err){
            throw err;
        }
        res.send(true);
    });
}
    