module.exports = function(db,app){
    app.post('/api/auth', async function(req, res){
        
        uName = req.body.username;
        pwd = req.body.password;
        var collection = db.collection('users');
        var collection2 = db.collection('userData');
        if (uName && pwd){       
            // find users in DB
            data = await collection.find({'username': uName, 'password': pwd}).toArray();
            if (data.length == 0){
                // If not found, return empty (invalid credentials)
                res.send();
            } else {
                // If found, fetch and return user data
                data2 = await collection2.find({'username': uName}).toArray();
                res.send(data2[0]);
            }
        }
    });
}