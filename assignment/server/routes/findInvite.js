var fs = require('fs');

module.exports = function(req, res) {
    inviteGroup = req.body[0];
    newUsers = [];
    fs.readFile('./data/groups.json', 'utf8', function(err, data){
        if (err) throw err;
        let groups = JSON.parse(data);
        let id = groups.findIndex(group => (group.groupName == inviteGroup));

        fs.readFile('./data/users.json', 'utf8', function(err, data){
            if (err) throw err;
            let users = JSON.parse(data);
            for (i in users){
                if (!groups[id].members.includes(users[i].username)){
                    newUsers.push(users[i].username)
                }
            }
            res.send(newUsers);
        })
    })
}