var fs = require('fs');

module.exports = function(req, res) {
    gName = req.body[0];
    fs.readFile('./data/groups.json', 'utf8', function(err, data){
        if (err) throw err;
        let groups = JSON.parse(data);
        let gID = groups.findIndex(group => (group.groupName == gName));
        
        groups.splice(gID, 1);

        fs.writeFile('./data/groups.json', JSON.stringify(groups), 'utf8', function(err){
            if (err) throw err;
            res.send(true);
        });
    })
}