// var fs = require('fs');

// module.exports = function(req, res) {
//     uName = req.body[0]
//     role = req.body[1]
//     userGroups = []
//     fs.readFile('./data/groups.json', 'utf8', function(err, data){
//         if (err) throw err;
//         let groups = JSON.parse(data);
//         for (i in groups){
//             if ( (groups[i].members.includes(uName)) || (role == "SA" || role == "GA") ){
//                 if (!userGroups.includes(groups[i].groupName)){
//                     userGroups.push(groups[i].groupName);
//                 }
//             }
//         }
//         res.send(userGroups);
//     })
// }

module.exports = function(db, app) {
    app.post('/findGroups', async function(req, res){
        uName = req.body[0];
        role = req.body[1];
        userGroups = [];

        var collection = db.collection('groups');        

        if (role == "SA" || role == "GA"){
            groups = await collection.find({}).toArray();
            for (i in groups){
                userGroups.push(groups[i].groupName);
            }
            res.send(userGroups);
        } else {
            groups = await collection.find({'members': uName}).toArray();
            for (i in groups){
                userGroups.push(groups[i].groupName);
            }
            res.send(userGroups);
        }
    })
}