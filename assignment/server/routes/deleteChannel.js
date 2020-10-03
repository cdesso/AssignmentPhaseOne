module.exports = function(db, app) {
    app.post('/deleteChannel', function(req, res){
        gName = req.body[0];
        cName = req.body[1];
        var collection = db.collection('groups');
        collection.updateOne({'groupName': gName}, {$pull: {'channels': {'channelName': cName}}}, (err, docs)=>{
            if (err) throw err;
            res.send(true);
        });
    });
}