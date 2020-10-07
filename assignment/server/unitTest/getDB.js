module.exports = function(db, app) {
    app.get('/getDB', async function(req, res){
        var collection = db.collection('groups');     

        groups = await collection.find({}).toArray();

        res.send(groups)
    })
}