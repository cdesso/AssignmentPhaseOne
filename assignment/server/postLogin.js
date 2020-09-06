var fs = require('fs');

module.exports = function(req, res) {
    var uName = req.body.username;
    var pwd = req.body.password;
    console.log(uName + " " + pwd);
    
    fs.readFile('./data/users.json', 'utf8', function(err, data){
        if (err) throw err;
        let users = JSON.parse(data);
        data = undefined

        for (let i=0; i<users.length; i++){
            if (uName == users[i].username && pwd == users[i].password){
                fs.readFile('./data/userData.json', 'utf8', function(err, extendedData){
                    if (err) throw err;
                    let userData = JSON.parse(extendedData);
                    let x = userData[i];
                    if (x.username == uName){
                        data = {
                            'id' : x.id,
                            'username' : x.username,
                            'email' : x.email,
                            'role' : x.role,
                            'valid' : true
                        }
                    }
                })
                res.send(data);
                break;
            }
        }
        if (typeof(data) == 'undefined'){
            res.send({'valid': false});
        }
    })
}