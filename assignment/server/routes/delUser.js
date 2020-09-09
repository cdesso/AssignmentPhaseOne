var fs = require('fs');

module.exports = function(req, res) {
    var id = req.body[0];
    usersArray = []

    console.log("tetet")
    fs.readFile('./data/users.json', 'utf8', function(err, data){
        if (err) throw err;
        let users = JSON.parse(data);
        users.splice(id, 1);
        fs.writeFile('./data/users.json', JSON.stringify(users), 'utf8', function(err){
            if (err) throw err;
        })

        fs.readFile('./data/userData.json', 'utf8', function(err, data){
            if (err) throw err;
            let userData = JSON.parse(data);
            userData.splice(id, 1);
            fs.writeFile('./data/userData.json', JSON.stringify(userData), 'utf8', function(err){
                if (err) throw err;
                for (let i=0; i<users.length; i++){
                    usersArray.push(users[i].username)
                }
                    res.send(usersArray);
            });
        });
    });
}
