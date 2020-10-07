module.exports = function(db, app) {
    app.post('/sendDeleteFromGroup', async function(req, res){
        uName = req.body[0];
        gName = req.body[1];
        var collection = db.collection('groups');
        // Delete user from group's members array, and delete user from group's channel's members document
        try{
            await collection.updateOne({'groupName': gName}, {'$pull': {'members': uName}});
            await collection.updateOne({'groupName': gName}, {'$pull':{'channels.$[].members': {'username': uName}}});
        } catch (err){
            throw err;
        }
        res.send(true);
    });
}   