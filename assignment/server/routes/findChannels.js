// var fs = require('fs');

// module.exports = function(req, res) {
//     uName = req.body[0]
//     group = req.body[1]
//     role = req.body[2]
//     channels = []
//     fs.readFile('./data/groups.json', 'utf8', function(err, data){
//         if (err) throw err;
//         let groups = JSON.parse(data);
//         for (i in groups){
//             if (groups[i].groupName == group){
//                 for (j in groups[i].channels){
//                     if ((role == "SA" || role == "GA") && (!channels.includes(groups[i].channels[j].channelName))){
//                         if (!channels.includes(groups[i].channels[j].channelName)){
//                             channels.push(groups[i].channels[j].channelName)
//                         }
//                     } else {
//                         for (u in groups[i].channels[j].members){
//                             if ((uName == groups[i].channels[j].members[u].username) && (!channels.includes(groups[i].channels[j].channelName))){
//                                 channels.push(groups[i].channels[j].channelName)
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//         res.send(channels);
//     })
// }

module.exports = function(db, app, ObjectID) {
    app.post('/findChannels', function(req, res){
        uName = req.body[0]
        group = req.body[1]
        role = req.body[2]
        channels = []

        var collection = db.collection('groups');
        if (role == "SA" || role == "GA"){
            collection.find({'groupName': group}).toArray((err, data)=>{
                for (i in data[0].channels){
                    channels.push(data[0].channels[i].channelName)
                }
                res.send(channels)
            })
        } else {
            collection.aggregate(
                {'$unwind': '$channels'},
                {'$match' : {'$and': [{'channels.members.username': uName}, {'groupName': group}]}},
                {'$group' : '$channels.channelName'}
            ).toArray((err, data)=>{
                for (i in data){
                    channels.push(data[i].channels.channelName)
                }
                res.send(channels)
            })
        }
    })   
}