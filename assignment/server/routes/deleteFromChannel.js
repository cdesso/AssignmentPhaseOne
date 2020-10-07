module.exports = function(db, app) {
    app.post('/deleteFromChannel', async function (req, res){
        cName = req.body[0];
        gName = req.body[1];
        uName = req.body[2];
        userArray = [];
        var collection = db.collection('groups');

        // Group database on the channelName
        data = await collection.aggregate(
            {'$unwind': '$channels'},
            {'$match' : {'$and': [{'groupName': gName}, {'channels.channelName': cName}]}},
            {'$group' : '$channels.channelName'}
        ).toArray();
        // Find users in channel
        for (i in data[0].channels.members){
            if (data[0].channels.members[i].username != uName){
                userArray.push(data[0].channels.members[i].username);   // Append to list if username != current user
            }
        }
        res.send(userArray);
    })
}