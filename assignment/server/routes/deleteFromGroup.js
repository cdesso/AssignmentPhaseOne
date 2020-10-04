module.exports = function(db, app) {
    app.post('/deleteFromGroup', async function(req, res){
        gName = req.body[0];
        uName = req.body[1];
        var collection = db.collection('groups');

        data = await collection.find({'groupName': gName}).toArray();
        res.send(data[0].members);
    });
}