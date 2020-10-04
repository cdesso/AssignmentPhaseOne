// var fs = require('fs');

// module.exports = function(req, res) {
//     cName = req.body[0];
//     gName = req.body[1];
//     uName = req.body[2];
//     fs.readFile('./data/groups.json', 'utf8', function(err, data){
//         if (err) throw err;
//         let groups = JSON.parse(data);
//         let gID = groups.findIndex(group => (group.groupName == gName));
//         let cID = groups[gID].channels.findIndex(channel => (channel.channelName == cName));
//         for (i in groups[gID].channels[cID].members){
//             console.log(groups[gID].channels[cID].members[i].username)
//             if (groups[gID].channels[cID].members[i].username == uName){
//                 groups[gID].channels[cID].members.splice(i, 1);
//             }
//         }
//         fs.writeFile('./data/groups.json', JSON.stringify(groups), 'utf8', function(err){
//             if (err) throw err;
//             res.send(true);
//         })
//     })
// }


module.exports = function(db, app) {
    app.post('/sendDeleteFromChannel', async function(req, res){
        cName = req.body[0];
        gName = req.body[1];
        uName = req.body[2];
        var collection = db.collection('groups');
        try{
        await collection.updateOne({'groupName': gName, 'channels.channelName': cName}, {'$pull':{'channels.$.members': {'username': uName}}});
        } catch (err){
            throw err;
        }
        res.send(true);
    })
}

