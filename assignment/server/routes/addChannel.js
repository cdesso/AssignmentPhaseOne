var fs = require('fs');

module.exports = function(req, res) {
    gName = req.body[0];
    fs.readFile('./data/groups.json', 'utf8', function(err, data){
        if (err) throw err;
        let groups = JSON.parse(data);
        
        for (i in groups){
            // console.log(groups[i])
            if (groups[i].groupName == gName){
                newChannel = {"channelName": "Channel" + (groups[i].channels.length + 1), "members": []}
                groups[i].channels.push(newChannel);
                fs.writeFile('./data/groups.json', JSON.stringify(groups), 'utf8', function(err){
                    if (err) throw err;
                    res.send(true);
                })
            }
        }
    })
}