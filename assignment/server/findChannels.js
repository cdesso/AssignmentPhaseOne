var fs = require('fs');

module.exports = function(req, res) {
    uName = req.body[0]
    group = req.body[1]
    channels = []
    fs.readFile('./data/groups.json', 'utf8', function(err, data){
        if (err) throw err;
        let groups = JSON.parse(data);
        // console.log(groups);
        for (i in groups){
            if (groups[i].groupName == group){
                for (j in groups[i].channels){
                    // console.log(groups[i].channels[j].members[0].username)
                    for (u in groups[i].channels[j].members){
                        // console.log(groups[i].channels[j].members)
                        // console.log(groups[i].channels[j].members[u])
                        if (uName == groups[i].channels[j].members[u].username) {
                            // console.log(groups[i].channels[j].channelName)
                            channels.push(groups[i].channels[j].channelName)
                        }
                    }
                }
            }
        }
        res.send(channels);
    })
}