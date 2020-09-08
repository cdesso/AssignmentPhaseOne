var fs = require('fs');

module.exports = function(req, res) {
    var oldName = req.body[0];
    var newName = req.body[1];
    fs.readFile('./data/groups.json', 'utf8', function(err, data){
        if (err) throw err;
        let groups = JSON.parse(data);
        console.log(groups);
        loop1:
        for (i in groups){
            if (groups[i].groupName == oldName){
                loop2:
                for (j in groups){
                    if ( groups[j].groupName.toLowerCase() == newName.toLowerCase() ){
                        res.send(false);
                        break loop1;
                    }
                }
                if ( (4 <= newName.length) && (newName.length <= 12)){
                    groups[i].groupName = newName;
                    fs.writeFile('./data/groups.json', JSON.stringify(groups), 'utf8', function(err){
                        if (err) throw err;
                        res.send(true);
                    })
                } else {
                    res.send(false);
                }
            }
        }
    })
}
