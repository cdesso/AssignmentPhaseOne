var fs = require('fs');

module.exports = function(req, res) {
    uName = req.body[0]
    role = req.body[1]
    userGroups = []
    fs.readFile('./data/groups.json', 'utf8', function(err, data){
        if (err) throw err;
        let groups = JSON.parse(data);
        for (i in groups){
            for (j in groups[i].channels){
                for (u in groups[i].channels[j].members){
                    if ( (uName == groups[i].channels[j].members[u].username) || (role == "SA" || role == "GA") ){
                        if (!userGroups.includes(groups[i].groupName)){
                            userGroups.push(groups[i].groupName);
                        }
                    }
                }
            }
        }
        res.send(userGroups);
    })
}