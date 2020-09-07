var fs = require('fs');

module.exports = function(req, res) {
    var uName = req.body.username;
    var pwd = req.body.password;
    console.log(uName + " " + pwd);
    
    fs.readFile('./data/users.json', 'utf8', function(err, data){
        if (err) throw err;
        let users = JSON.parse(data);
        let id = users.findIndex(user => ((user.username == uName) && (user.password == pwd)));

        if (id == -1){
            res.send();
        } else {
            fs.readFile('./data/userData.json', 'utf8', function(err, data){
                if (err) throw err;
                let userData = JSON.parse(data);
                let y = userData.findIndex( user => (user.username == uName));
                res.send([userData[y], {'id': id}]);
            })
        }
    })
}