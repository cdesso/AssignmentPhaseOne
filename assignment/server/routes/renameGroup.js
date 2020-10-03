module.exports = function(db, app) {
    app.post('/renameGroup', function(req, res){
        var oldName = req.body[0];
        var newName = req.body[1];
        var collection = db.collection('groups');
        if ( (4 <= newName.length) && (newName.length <= 12) ){
            collection.updateOne({'groupName': oldName}, {$set: {'groupName': newName}}, (err, docs)=>{
                if (err) throw err;
                res.send([true, newName]);
            });
        } else { 
            res.send(false) 
        }
    });
}