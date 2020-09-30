module.exports = function(db, app) {
    app.post('/renameGroup', function(req, res){
        var oldName = req.body[0];
        var newName = req.body[1];
        var collection = db.collection('groups');
        collection.find({'groupName': oldName}).toArray((err, group)=>{
            if ( group[0].groupName.toLowerCase() == newName.toLowerCase() ){
                res.send(false);
            } else if ( (4 <= newName.length) && (newName.length <= 12) ){
                collection.updateOne({'groupName': oldName}, {$set: {'groupName': newName}}, (err, docs)=>{
                    if (err) throw err;
                    res.send([true, newName]);
                })
            } else { res.send(false) }
        });
    });
}