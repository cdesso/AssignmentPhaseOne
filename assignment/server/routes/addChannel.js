// var fs = require('fs');

// module.exports = function(req, res) {
//     gName = req.body[0];
//     fs.readFile('./data/groups.json', 'utf8', function(err, data){
//         if (err) throw err;
//         let groups = JSON.parse(data);
        
//         for (i in groups){
//             // console.log(groups[i])
//             if (groups[i].groupName == gName){
//                 newChannel = {"channelName": "Channel" + (groups[i].channels.length + 1), "members": []}
//                 groups[i].channels.push(newChannel);
//                 fs.writeFile('./data/groups.json', JSON.stringify(groups), 'utf8', function(err){
//                     if (err) throw err;
//                     res.send(true);
//                 })
//             }
//         }
//     })
// }

module.exports = function(db, app) {
    app.post('/addChannel', function(req, res){
        gName = req.body[0];
        var collection = db.collection('groups');
        collection.find({'groupName': gName}).toArray((err, group)=>{
            newChannel = {"channelName": "Channel" + (group[0].channels.length + 1), "members": []}
            collection.updateOne({'groupName': gName}, {$push: {'channels': newChannel}}, (err, docs)=>{
                if (err) throw err;
                res.send(true);
            });
        });
    });
}