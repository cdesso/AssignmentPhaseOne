module.exports = function(db, app) {
    app.post('/sendGroupInvite', function(req, res){
        user = req.body[0];
        inviteGroup = req.body[1];
        var collection = db.collection('groups');
        collection.updateOne({'groupName': inviteGroup}, {$push: {'members': user}}, (err, docs)=>{
            if (err) throw err;
            res.send(true);
        });
    });
}