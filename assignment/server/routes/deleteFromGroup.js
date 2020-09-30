module.exports = function(db, app) {
    app.post('/deleteFromGroup', function(req, res){
        gName = req.body[0];
        uName = req.body[1];

        var collection = db.collection('groups');
        collection.find({'groupName': gName}).toArray((err, group)=>{
            id = group[0].members.findIndex(member => (member == uName));
            group[0].members.splice(id, 1);
            res.send(group[0].members);
        });
    });
}