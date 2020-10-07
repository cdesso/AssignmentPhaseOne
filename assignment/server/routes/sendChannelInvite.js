module.exports = function(db, app) {
    app.post('/sendChannelInvite', async function(req, res){
        uName = req.body[0];
        inviteGroup = req.body[1];
        inviteChannel = req.body[2];
        var collection = db.collection('groups');
        try {
            await collection.updateOne({'groupName': inviteGroup}, {'$addToSet': {'members': uName}});   // Add user to group's members array
            await collection.updateOne(
                {'$and': [
                    {'groupName': inviteGroup}, 
                    {'channels.channelName': inviteChannel}
                ]}, 
                {'$push':{
                    'channels.$.members': {'username': uName}
                }});   // Add user to channel members document
        } catch (err){
            throw err;
        }
        res.send(true);
    });
}
    