var fs = require('fs');

module.exports = function(req, res) {
    uName = req.body[0];
    gName = req.body[1];
    fs.readFile('./data/groups.json', 'utf8', function(err, data){
        if (err) throw err;
        let groups = JSON.parse(data);
        let gID = groups.findIndex(group => (group.groupName == gName));
        let uID = groups[gID].members.findIndex(member => (member == uName));
        groups[gID].members.splice(uID, 1);
        fs.writeFile('./data/groups.json', JSON.stringify(groups), 'utf8', function(err){
            if (err) throw err;
            res.send(true);
        })
    })
}