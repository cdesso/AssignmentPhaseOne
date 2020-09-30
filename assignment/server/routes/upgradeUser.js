var fs = require('fs');

module.exports = function(req, res) {
    var id = req.body[0];
    fs.readFile('./data/userData.json', 'utf8', function(err, data){
        if (err) throw err;
        let users = JSON.parse(data);
        if (users[id].role != 'SA'){
            users[id].role = 'SA';
            fs.writeFile('./data/userData.json', JSON.stringify(users), 'utf8', function(err){
                if (err) throw err;
                res.send(true);
            });
        } else {
            res.send(false);
        }
        // let id = users.findIndex(user => (user.username.toLowerCase() == uName.toLowerCase()));
        // if (id == -1){
        //     users.push({"username": uName, "password": pwd});
        //     fs.writeFile('./data/users.json', JSON.stringify(users), 'utf8', function(err){
        //         if (err) throw err;
        //     });
        //     fs.readFile('./data/userData.json', 'utf8', function(err, data){
        //         if (err) throw err;
        //         let userData = JSON.parse(data);
        //         userData.push({"username": uName, "email": email, "role": role})
        //         fs.writeFile('./data/userData.json', JSON.stringify(userData), 'utf8', function(err){
        //             if (err) throw err;
        //         });
        //     })
        //     console.log("User added")
        //     res.send({'error': null});
        // } else {
        //     res.send({'error': 'username'})
        // }
    })
}