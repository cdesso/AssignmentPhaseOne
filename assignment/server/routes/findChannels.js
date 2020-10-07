module.exports = function(db, app, ObjectID) {
    app.post('/findChannels', async function(req, res){
        uName = req.body[0];
        group = req.body[1];
        role = req.body[2];
        channels = [];
        var collection = db.collection('groups');
        // If the user is a SA or GA, find all channels (they do not have to be added to that channel)
        if (role == "SA" || role == "GA"){
            data = await collection.find({'groupName': group}).toArray();
            for (i in data[0].channels){
                channels.push(data[0].channels[i].channelName);
            }
            res.send(channels);
        // Otherwise, find the channels which the user is part of
        } else {
            data = await collection.aggregate(
                {'$unwind': '$channels'},
                {'$match' : {'$and': [{'channels.members.username': uName}, {'groupName': group}]}},
                {'$group' : '$channels.channelName'}
            ).toArray();
            for (i in data){
                channels.push(data[i].channels.channelName);
            }
            res.send(channels);
        }
    })   
}