var fs = require('fs');

module.exports = function(req, res) {
    uName = req.body[0]
    userGroups = []
    fs.readFile('./data/groups.json', 'utf8', function(err, data){
        if (err) throw err;
        let groups = JSON.parse(data);
        // console.log(groups);
        for (i in groups){
            // console.log(groups[1].groupName);
            for (j in groups[i].channels){
                // console.log(groups[i].channels[j].members[0].username)
                for (u in groups[i].channels[j].members){
                    // console.log(groups[i].channels[j].members)
                    // console.log(groups[i].channels[j].members[u])
                    if ( (uName == groups[i].channels[j].members[u].username) && (!userGroups.includes(groups[i].groupName)) ){
                        userGroups.push(groups[i].groupName);
                    }
                }
            }
        }
        res.send(userGroups);
    })
}