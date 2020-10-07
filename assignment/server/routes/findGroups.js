module.exports = function(db, app) {
    app.post('/findGroups', async function(req, res){
        uName = req.body[0];
        role = req.body[1];
        userGroups = [];

        var collection = db.collection('groups');        
        // If the user is a SA or GA, find all groups in DB (they do not have to be listed as a member)
        if (role == "SA" || role == "GA"){
            groups = await collection.find({}).toArray();
            for (i in groups){
                userGroups.push(groups[i].groupName);
            }
            res.send(userGroups);
        // Otherwise, find the groups which they are listed as a member.
        } else {
            groups = await collection.find({'members': uName}).toArray();
            for (i in groups){
                userGroups.push(groups[i].groupName);
            }
            res.send(userGroups);
        }
    })
}