module.exports = function(db, app) {
    app.post('/addGroup', function(req, res){
        uName = req.body[0];
        var collection = db.collection('groups');
        collection.countDocuments({},(err, count)=>{
            newGroup = {'groupName': ("Group" + (count + 1)), 
                        "members": [], 
                        "channels": [{
                            "channelName": "General", 
                            "members": [{"username": uName}]
                        }]
                        };
            collection.insertOne(newGroup, (err, docs)=>{
                if (err) throw err;
                res.send(true);
            });
        });
    });
}