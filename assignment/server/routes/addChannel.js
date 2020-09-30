module.exports = function(db, app) {
    app.post('/addChannel', function(req, res){
        gName = req.body[0];
        var collection = db.collection('groups');
        collection.find({'groupName': gName}).toArray((err, group)=>{
            newChannel = {"channelName": "Channel" + (group[0].channels.length + 1), "members": []}
            collection.updateOne({'groupName': gName}, {$push: {'channels': newChannel}}, (err, docs)=>{
                if (err) throw err;
                res.send(true);
            });
        });
    });
}