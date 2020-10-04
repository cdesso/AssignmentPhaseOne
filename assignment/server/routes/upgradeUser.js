module.exports = function(db, app) {
    app.post('/upgradeUser', async function(req, res){
        var uName = req.body[0];
        var collection = db.collection('userData');
        try{
            await collection.updateOne({'username': uName}, {$set: {'role': 'SA'}});
        } catch (err){
            throw err;
        }
        res.send(true);
    });
}