module.exports = function(db, app) {
    app.post('/deleteChannel', async function(req, res){
        gName = req.body[0];
        cName = req.body[1];
        var collection = db.collection('groups');
        try{   // Remove group from DB
            await collection.updateOne({'groupName': gName}, {$pull: {'channels': {'channelName': cName}}});
        } catch (err){
            throw err;
        }
        res.send(true);
    });
}