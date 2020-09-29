// var fs = require('fs');

// module.exports = function(req, res) {
//     user = req.body[0];
//     inviteGroup = req.body[1];
//     fs.readFile('./data/groups.json', 'utf8', function(err, data){
//         if (err) throw err;
//         let groups = JSON.parse(data);
//         let id = groups.findIndex(group => (group.groupName == inviteGroup));
//         groups[id].members.push(user);
//         fs.writeFile('./data/groups.json', JSON.stringify(groups), 'utf8', function(err){
//             if (err) throw err;
//             res.send(true);
//         })
//     })
// }

module.exports = function(db, app) {
    app.post('/sendGroupInvite', function(req, res){
        user = req.body[0];
        inviteGroup = req.body[1];
        var collection = db.collection('groups');
        collection.updateOne({'groupName': inviteGroup}, {$push: {'members': user}}, (err, docs)=>{
            if (err) throw err;
            res.send(true);
        });
    });
}