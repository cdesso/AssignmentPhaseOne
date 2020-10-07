module.exports = function(db, app) {
    app.post('/sendDeleteFromChannel', async function(req, res){
        cName = req.body[0];
        gName = req.body[1];
        uName = req.body[2];
        var collection = db.collection('groups');
        // Pull user from a group's channel's members document
        try{
            await collection.updateOne({'groupName': gName, 'channels.channelName': cName}, {'$pull':{'channels.$.members': {'username': uName}}});
        } catch (err){
            throw err;
        }
        res.send(true);
    })
}

