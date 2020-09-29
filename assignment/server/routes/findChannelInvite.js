// var fs = require('fs');

// module.exports = function(req, res) {
//     inviteGroup = req.body[0];
//     inviteChannel = req.body[1];
//     newUsers = [];
//     fs.readFile('./data/groups.json', 'utf8', function(err, data){
//         if (err) throw err;
//         let groups = JSON.parse(data);
//         let gID = groups.findIndex(group => (group.groupName == inviteGroup));
//         let cID = groups[gID].channels.findIndex(channel => (channel.channelName == inviteChannel));

//         fs.readFile('./data/users.json', 'utf8', function(err, data){
//             if (err) throw err;
//             let users = JSON.parse(data);
//             for (i in users){
//                 console.log(users[i].username)
//                 if(groups[gID].channels[cID].members.findIndex(member => (member.username == users[i].username)) == -1){
//                     newUsers.push(users[i].username)
//                 }
//             }
//             res.send(newUsers);
//         })
//     })
// }

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