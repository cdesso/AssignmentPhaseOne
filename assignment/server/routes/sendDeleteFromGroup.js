// var fs = require('fs');

// module.exports = function(req, res) {
//     uName = req.body[0];
//     gName = req.body[1];
//     fs.readFile('./data/groups.json', 'utf8', function(err, data){
//         if (err) throw err;
//         let groups = JSON.parse(data);
//         let gID = groups.findIndex(group => (group.groupName == gName));
//         let uID = groups[gID].members.findIndex(member => (member == uName));
//         groups[gID].members.splice(uID, 1);

//         for (i in groups[gID].channels){
            
//             for (j in groups[gID].channels[i].members){
//                 if (groups[gID].channels[i].members[j].username == uName){
//                     groups[gID].channels[i].members.splice(j, 1);
//                 }
//             }
//         }
//         fs.writeFile('./data/groups.json', JSON.stringify(groups), 'utf8', function(err){
//             if (err) throw err;
//             res.send(true);
//         })
//     })
// }

module.exports = function(db, app) {
    app.post('/sendDeleteFromGroup', function(req, res){
        uName = req.body[0];
        gName = req.body[1];
        var collection = db.collection('groups');

        collection.updateOne({'groupName': gName}, {'$pull': {'members': uName}}, (err, docs)=>{
            if (err) throw err;
            collection.updateOne({'groupName': gName}, {'$pull':{'channels': {'members': {'username': uName}}}}, {'multi': true}, (err, docs)=>{
                if (err) throw err;
                res.send(true);
            })
        })
        
        
        
        // collection.find({}).toArray((err, group)=>{
        //     if (err) throw err;
        //     let uID = group[0].members.findIndex(member => (member == uName));
        //     collection.updateOne({'groupName': gName}, {'$pull': {'members': group[0].members[uID]}}, (err, docs)=>{
        //         if (err) throw err;
        //             for (i in group[0].channels){
        //                 let id = group[0].channels[i].members.findIndex(member => (member.username == uName));
        //                 if (id >= 0){
        //                     // console.log(group[0].channels);
        //                     group[0].channels[i].members.splice(id, 1);
        //                 }
        //                 channel = 'channels.'+i+'.members';
        //                 console.log(channel)
        //                 collection.updateOne({'groupName': gName}, {'$pull':{'channels': {'members': {'username': uName}}}}, {'multi': true}, (err, docs)=>{
        //                     if (err) throw err;
        //                     res.send(true);
        //                 })
        //             }
        //     });
        // });
    });
}    