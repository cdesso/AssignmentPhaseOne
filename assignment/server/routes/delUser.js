module.exports = function(db, app) {
    app.post('/delUser', function(req, res){
        var uName = req.body[0];
        usersArray = [];
        var collection = db.collection('users');
        collection.deleteOne({'username': uName},(err, docs)=>{
            var collection = db.collection('userData');
            collection.deleteOne({'username': uName},(err, docs)=>{
                res.send(true);
            });
        });
    });
}