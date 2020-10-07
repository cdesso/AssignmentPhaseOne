module.exports = function(db, app) {
    app.post('/clearDB', async function(req, res){
        var collection = db.collection('groups');   
        try{
            await collection.deleteMany({});
        } catch (err){
            throw err;
        }
    })
}