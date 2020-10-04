module.exports = function(db, app) {
    app.post('/addGroup', async function(req, res){
        uName = req.body[0];
        var collection = db.collection('groups');

        count = await collection.countDocuments({});
        newGroup = {'groupName': ("Group" + (count + 1)), 
                    "members": [], 
                    "channels": [{
                        "channelName": "General", 
                        "members": [{"username": uName}],
                        "messages": []
                    }]
                    };
        exist = await collection.find({'groupName': newGroup.groupName}).toArray()
        if (exist.length > 0){  res.send(false);  }
        else{
            try{
                await collection.insertOne(newGroup);
            } catch (err){
                throw err;
            }
            res.send(true);
        }
        
    });
}