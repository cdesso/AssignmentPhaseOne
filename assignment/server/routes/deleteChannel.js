module.exports = function(db, app) {
    app.post('/deleteChannel', function(req, res){
        gName = req.body[0];
        cName = req.body[1];
        var collection = db.collection('groups');
        collection.find({'groupName': gName}).toArray((err, group)=>{
            if (err) throw err;
            for (i in group[0].channels){
                if (group[0].channels[i].channelName == cName){
                    collection.updateOne({'groupName': gName}, {$pull: {'channels': group[0].channels[i]}}, (err, docs)=>{
                        if (err) throw err;
                        res.send(true);
                    });
                }
            }
        });
    });
}