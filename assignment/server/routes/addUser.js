module.exports = function(db, app) {
    app.post('/addUser', async function(req, res){
        var uName = req.body.NewUsername;
        var email = req.body.NewEmail;
        var pwd = req.body.NewPassword;
        var pwd2 = req.body.NewPassword2;
        var role = req.body.NewRole;
        var collection = db.collection('users');
        var collection2 = db.collection('userData');


        if (uName.length <= 3){   res.send({'error': 'uNameLength'});   }   // Check if username length is valid
        else if (email.length <= 5){   res.send({'error': 'emailLength'});   }   // Check if email length is valid
        else if (pwd != pwd2){   res.send({'error': 'password'});   }   // Check if passwords match
        else if (pwd.length <= 5){   res.send({'error': 'passwordLength'});   }   // Check if password length is valid
        else {
            user = await collection.find({'username': uName}).toArray(); // Check if username exists in DB
            if (user.length == 0){
                try{   // If user does not exist, add to DB
                    await collection.insertOne({'username': uName, 'password': pwd});
                    await collection2.insertOne({"username": uName, "email": email, "role": role});
                } catch(err){
                    throw err;
                }
                res.send({'error': false});
            } else {   // If user exists, return with error
                res.send({'error': 'username'});
            }
        }
    });
}