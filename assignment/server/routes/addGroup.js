// var fs = require('fs');

// module.exports = function(req, res) {
//     uName = req.body[0];
//     fs.readFile('./data/groups.json', 'utf8', function(err, data){
//         if (err) throw err;
//         let groups = JSON.parse(data);
//         newGroup = "Group" + (groups.length + 1)
//         newGroup = {"groupName": newGroup, "members": [], "channels": [
//             {"channelName": "General", "members": [
//                 {"username": uName}
//             ]}
//         ]};
//         groups.push(newGroup)
//         fs.writeFile('./data/groups.json', JSON.stringify(groups), 'utf8', function(err){
//             if (err) throw err;
//             res.send(true);
//         })
//     })
// }

module.exports = function(db, app) {
    app.post('/addGroup', function(req, res){
        uName = req.body[0];
        var collection = db.collection('groups');
        collection.countDocuments({},(err, count)=>{
            newGroup = {'groupName': ("Group" + (count + 1)), 
                        "members": [], 
                        "channels": [{
                            "channelName": "General", 
                            "members": [{"username": uName}]
                        }]
                        };
            collection.insertOne(newGroup, (err, docs)=>{
                if (err) throw err;
                res.send(true);
            });
        });
    });
}