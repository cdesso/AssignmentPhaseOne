var fs = require('fs');

module.exports = function(req, res) {
    gName = req.body[0];
    uName = req.body[1];
    fs.readFile('./data/groups.json', 'utf8', function(err, data){
        if (err) throw err;
        let groups = JSON.parse(data);
        let id = groups.findIndex(group => (group.groupName == gName));
        if (groups[id].members.includes(uName)){
            let uID = groups[id].members.findIndex(member => (member == uName));
            groups[id].members.splice(uID, 1);
        }
        res.send(groups[id].members);
    })
}