// var fs = require('fs');

// module.exports = function(req, res) {
//     inviteGroup = req.body[0];
//     newUsers = [];
//     fs.readFile('./data/groups.json', 'utf8', function(err, data){
//         if (err) throw err;
//         let groups = JSON.parse(data);
//         let id = groups.findIndex(group => (group.groupName == inviteGroup));

//         fs.readFile('./data/users.json', 'utf8', function(err, data){
//             if (err) throw err;
//             let users = JSON.parse(data);
//             for (i in users){
//                 if (!groups[id].members.includes(users[i].username)){
//                     newUsers.push(users[i].username)
//                 }
//             }
//             res.send(newUsers);
//         })
//     })
// }


module.exports = function(db, app) {
    app.post('/findInvite', function(req, res){
        inviteGroup = req.body[0];
        newUsers = [];
        var collection = db.collection('groups');
        collection.find({'groupName': inviteGroup}).toArray((err, group)=>{
            var collection = db.collection('users');
            collection.find({}).toArray((err, users)=>{
                for (i in users){
                    if (!group[0].members.includes(users[i].username)){
                        newUsers.push(users[i].username)
                    }
                }
                res.send(newUsers);
            })
        })
    })
}