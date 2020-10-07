module.exports = function(db, app) {
    app.post('/restoreDB', async function(req, res){
        groups = req.body;
        var collection = db.collection('groups');
        try{
            await collection.deleteMany({});
            await collection.insertMany(groups);
        } catch (err){
            throw err;
        }
    })
}