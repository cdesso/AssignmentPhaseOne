module.exports = function(db, app) {
    app.post('/sendGroupInvite', async function(req, res){
        user = req.body[0];
        inviteGroup = req.body[1];
        var collection = db.collection('groups');
        try{
            await collection.updateOne({'groupName': inviteGroup}, {$push: {'members': user}});
        } catch (err){
            throw err;
        }
        res.send(true)
    });
}