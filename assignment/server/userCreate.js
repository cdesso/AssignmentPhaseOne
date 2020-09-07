var fs = require('fs');

module.exports = function(req, res) {
    var uName = req.body.NewUsername;
    var email = req.body.NewEmail;
    var pwd = req.body.NewPassword;
    var pwd2 = req.body.NewPassword2;
    var role = req.body.NewRole;
    console.log(uName + " " + email + " " + pwd + " " + pwd2 + " " + role);
    if (uName.length <= 3){
        res.send({'error': 'uNameLength'})
    }
    else if (email.length <= 5){
        res.send({'error': 'emailLength'})
    }
    else if (pwd != pwd2){
        res.send({'error': 'password'})
    }
    else if (pwd.length <= 5){
        res.send({'error': 'passwordLength'})
    }
    else if (role == ""){
        res.send({'error': 'role'})
    } else {
        fs.readFile('./data/users.json', 'utf8', function(err, data){
            if (err) throw err;
            let users = JSON.parse(data);
            let id = users.findIndex(user => (user.username == uName));
            if (id == -1){
                users.push({"username": uName, "password": pwd});
                fs.writeFile('./data/users.json', JSON.stringify(users), 'utf8', function(err){
                    if (err) throw err;
                });
                fs.readFile('./data/userData.json', 'utf8', function(err, data){
                    if (err) throw err;
                    let userData = JSON.parse(data);
                    userData.push({"username": uName, "email": email, "role": role})
                    fs.writeFile('./data/userData.json', JSON.stringify(userData), 'utf8', function(err){
                        if (err) throw err;
                    });
                })
                console.log("User added")
                res.send({'error': null});
            } else {
                res.send({'error': 'username'})
            }
        })
    }
}