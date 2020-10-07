module.exports = function(db, app) {
    app.post('/addGroup', async function(req, res){
        uName = req.body[0];
        var collection = db.collection('groups');

        count = await collection.countDocuments({});   // Count the number of groups in DB
        newGroup = {'groupName': ("Group" + (count + 1)), 
                    "members": [], 
                    "channels": [{
                        "channelName": "General", 
                        "members": [{"username": uName}],
                        "messages": []
                    }]
                    };   // Create new group data
        exist = await collection.find({'groupName': newGroup.groupName}).toArray()   // See if groupName already exists in DB
        if (exist.length > 0){  res.send(false);  }
        else{
            try{
                await collection.insertOne(newGroup);   // If not exist, add group to DB
            } catch (err){
                throw err;
            }
            res.send(true);
        }
    });
}