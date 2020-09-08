var fs = require('fs');

module.exports = function(req, res) {
    uName = req.body[0]
    group = req.body[1]
    role = req.body[2]
    channels = []
    fs.readFile('./data/groups.json', 'utf8', function(err, data){
        if (err) throw err;
        let groups = JSON.parse(data);
        for (i in groups){
            if (groups[i].groupName == group){
                for (j in groups[i].channels){
                    if ((role == "SA" || role == "GA") && (!channels.includes(groups[i].channels[j].channelName))){
                        if (!channels.includes(groups[i].channels[j].channelName)){
                            channels.push(groups[i].channels[j].channelName)
                        }
                    } else {
                        for (u in groups[i].channels[j].members){
                            if ((uName == groups[i].channels[j].members[u].username) || (!channels.includes(groups[i].channels[j].channelName))){
                                channels.push(groups[i].channels[j].channelName)
                            }
                        }
                    }
                }
            }
        }
        res.send(channels);
    })
}