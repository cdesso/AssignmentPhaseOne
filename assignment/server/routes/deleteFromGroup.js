// var fs = require('fs');

// module.exports = function(req, res) {
//     gName = req.body[0];
//     uName = req.body[1];
//     fs.readFile('./data/groups.json', 'utf8', function(err, data){
//         if (err) throw err;
//         let groups = JSON.parse(data);
//         let id = groups.findIndex(group => (group.groupName == gName));
//         if (groups[id].members.includes(uName)){
//             let uID = groups[id].members.findIndex(member => (member == uName));
//             groups[id].members.splice(uID, 1);
//         }
//         res.send(groups[id].members);
//     })
// }

module.exports = function(db, app) {
    app.post('/deleteFromGroup', function(req, res){
        gName = req.body[0];
        uName = req.body[1];

        var collection = db.collection('groups');
        collection.find({'groupName': gName}).toArray((err, group)=>{
            id = group[0].members.findIndex(member => (member == uName));
            group[0].members.splice(id, 1);
            res.send(group[0].members);
        });
    });
}