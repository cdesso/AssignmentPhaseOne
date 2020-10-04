module.exports = function(db, app) {
    app.post('/delUser', async function(req, res){
        var uName = req.body[0];
        usersArray = [];
        var collection = db.collection('users');
        var collection2 = db.collection('userData');
        try{
            await collection.deleteOne({'username': uName});
            await collection2.deleteOne({'username': uName});
        } catch (err){
            throw err;
        }
        res.send(true);
    });
}