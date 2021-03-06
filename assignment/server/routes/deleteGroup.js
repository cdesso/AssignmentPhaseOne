module.exports = function(db, app) {
    app.post('/deleteGroup', async function(req, res){
        gName = req.body[0];
        var collection = db.collection('groups');
        // Delete from database a group with the specified groupName
        try {
            await collection.deleteOne({'groupName': gName});
        } catch (err){
            throw err;
        }
        res.send(true);
    })
}