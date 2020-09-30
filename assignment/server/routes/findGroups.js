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
        userGroups = [];
        var collection = db.collection('groups');
        collection.aggregate(
            { $unwind: "$groupMembers" }, 
            {$lookup: 
                {from: "userData", localField: "groupMembers", foreignField: "_id", as: "members"}
            }, 
            { 
                $match: { "members.username": uName }
            },
            { $unwind: "$members" },
            {$group:
                {
                    _id: "$_id", 
                    members: { $push: "$groupMembers"},
                    membersData: {$push: "$members"}
                }
            }
        ).toArray((err, groups)=>{
            // console.log(groups);
            for (i in groups){
                userGroups.push(groups[i].groupName);
            }
            res.send(userGroups);
        });

            // var collection = db.collection('groups');
            // collection.find({}).toArray((err, groups)=>{
            //     for (i in groups){
            //         console.log("members: " + groups[i].members);
            //         console.log("userID: " + user[0]._id);

            //         // if (groups[i].members.includes(user[0]._id)){
            //         //     console.log(groups)
            //         // }
            //     }
                
            // });
            // if (data.length == 0){
            //     res.send()
            // } else {
            //     for (i in data){
            //         if ( (data[i].members.includes(uName)) || (role == "SA" || role == "GA") ){
            //             userGroups.push(data[i].groupName);
            //         }
            //     }
            //     res.send(userGroups)
            // }
        // });
    });
}