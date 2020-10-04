// var fs = require('fs');

// module.exports = function(req, res) {
//     cName = req.body[0];
//     gName = req.body[1];
//     uName = req.body[2];
//     userArray = []
//     fs.readFile('./data/groups.json', 'utf8', function(err, data){
//         if (err) throw err;
//         let groups = JSON.parse(data);
//         let gID = groups.findIndex(group => (group.groupName == gName));
//         let cID = groups[gID].channels.findIndex(channel => (channel.channelName == cName));
//         for (i in groups[gID].channels[cID].members){
//             if (groups[gID].channels[cID].members[i].username != uName){
//                 userArray.push(groups[gID].channels[cID].members[i].username);
//             }
//         }
//         res.send(userArray);
//     })
// }

module.exports = function(db, app) {
    app.post('/deleteFromChannel', async function (req, res){
        cName = req.body[0];
        gName = req.body[1];
        uName = req.body[2];
        userArray = [];
        var collection = db.collection('groups');

        data = await collection.aggregate(
            {'$unwind': '$channels'},
            {'$match' : {'$and': [{'groupName': gName}, {'channels.channelName': cName}]}},
            {'$group' : '$channels.channelName'}
        ).toArray();
        for (i in data[0].channels.members){
            if (data[0].channels.members[i].username != uName){
                userArray.push(data[0].channels.members[i].username);
            }
        }
        res.send(userArray);
    })
}