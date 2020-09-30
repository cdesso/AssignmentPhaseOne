module.exports = function(db, app) {
    app.post('/deleteGroup', function(req, res){
        gName = req.body[0];
        var collection = db.collection('groups');
        collection.deleteOne({'groupName': gName},()=>{
            res.send(true);
        });
    })
}