module.exports = function(db, app) {
    app.post('/addChannel', async function(req, res){
        gName = req.body[0];
        var collection = db.collection('groups');
        data = await collection.find({'groupName': gName}).toArray();
        newChannel = {"channelName": "Channel" + (data[0].channels.length + 1), "members": []};
        try{
            await collection.updateOne({'groupName': gName}, {$push: {'channels': newChannel}});
        } catch (err){
            throw err;
        }
        res.send(true);
    });
}