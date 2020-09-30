module.exports = function(db, app) {
    app.post('/upgradeUser', function(req, res){
        var uName = req.body[0];
        var collection = db.collection('userData');
        collection.updateOne({'username': uName}, {$set: {'role': 'SA'}},(err, docs)=>{
            if (err) throw err;
            res.send(true);
        })
    });
}