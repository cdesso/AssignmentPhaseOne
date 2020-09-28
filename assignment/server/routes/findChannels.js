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

module.exports = function(db, app) {
    app.post('/findChannels', function(req, res){
        uName = req.body[0]
        group = req.body[1]
        role = req.body[2]
        channels = []

        var collection = db.collection('groups');
        collection.find({}).toArray((err, data)=>{
            for (i in data){
                if (data[i].groupName == group){
                    for (j in data[i].channels){
                        if ((role == "SA" || role == "GA") && (!channels.includes(data[i].channels[j].channelName))){
                            if (!channels.includes(data[i].channels[j].channelName)){
                                channels.push(data[i].channels[j].channelName)
                            }
                        } else {
                            for (u in data[i].channels[j].members){
                                if ((uName == data[i].channels[j].members[u].username) && (!channels.includes(data[i].channels[j].channelName))){
                                    channels.push(data[i].channels[j].channelName)
                                }
                            }
                        }
                    }
                }
            }
            res.send(channels);
        })
    })   
}