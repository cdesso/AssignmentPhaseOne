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
    app.post('/findGroups', function(req, res){
        uName = req.body[0]
        role = req.body[1]
        userGroups = []
        var collection = db.collection('groups');
        collection.find({}).toArray((err, data)=>{
            if (data.length == 0){
                res.send()
            } else {
                for (i in data){
                    if ( (data[i].members.includes(uName)) || (role == "SA" || role == "GA") ){
                        userGroups.push(data[i].groupName);
                    }
                }
                res.send(userGroups)
            }
        });
    });
}