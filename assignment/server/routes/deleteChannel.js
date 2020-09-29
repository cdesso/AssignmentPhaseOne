// var fs = require('fs');

// module.exports = function(req, res) {
//     gName = req.body[0];
//     cName = req.body[1];
//     fs.readFile('./data/groups.json', 'utf8', function(err, data){
//         if (err) throw err;
//         let groups = JSON.parse(data);
//         let gID = groups.findIndex(group => (group.groupName == gName));
//         let cID = groups[gID].channels.findIndex(channel => (channel.channelName == cName));
//         groups[gID].channels.splice(cID, 1);

//         fs.writeFile('./data/groups.json', JSON.stringify(groups), 'utf8', function(err){
//             if (err) throw err;
//             res.send(true);
//         });
//     })
// }
 
module.exports = function(db, app) {
    app.post('/deleteChannel', function(req, res){
        gName = req.body[0];
        cName = req.body[1];
        var collection = db.collection('groups');
        collection.find({'groupName': gName}).toArray((err, group)=>{
            if (err) throw err;
            for (i in group[0].channels){
                if (group[0].channels[i].channelName == cName){
                    collection.updateOne({'groupName': gName}, {$pull: {'channels': group[0].channels[i]}}, (err, docs)=>{
                        if (err) throw err;
                        res.send(true);
                    });
                }
            }
        });
    });
}