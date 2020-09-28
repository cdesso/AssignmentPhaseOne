// var fs = require('fs');

// module.exports = function(req, res) {
//     var uName = req.body.username;
//     var pwd = req.body.password;
//     console.log(uName + " " + pwd);
    
//     fs.readFile('./data/users.json', 'utf8', function(err, data){
//         if (err) throw err;
//         let users = JSON.parse(data);
//         let id = users.findIndex(user => ((user.username == uName) && (user.password == pwd)));

//         if (id == -1){
//             res.send();
//         } else {
//             fs.readFile('./data/userData.json', 'utf8', function(err, data){
//                 if (err) throw err;
//                 let userData = JSON.parse(data);
//                 let y = userData.findIndex( user => (user.username == uName));
//                 res.send([userData[y], {'id': id}]);
//             })
//         }
//     })
// }

module.exports = function(db,app){
    
    app.post('/api/auth', function(req, res){
        if (!req.body){
            return res.sendStatus(400);
        }
        uName = req.body.username
        pwd = req.body.password
        if (uName && pwd){
            var collection = db.collection('users');
            collection.find({'username': uName, 'password': pwd}).toArray((err, data)=>{
                if (data.length == 0){
                    res.send();
                } else {
                    var collection = db.collection('userData')
                    collection.find({'username': uName}).toArray((err, data2)=>{
                        res.send(data2);
                    })
                }
            })
        }
    });
}