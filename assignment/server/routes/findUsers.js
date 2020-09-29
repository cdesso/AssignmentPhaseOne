// var fs = require('fs');

// module.exports = function(req, res) {
//     usersArray = []
//     fs.readFile('./data/users.json', 'utf8', function(err, data){
//         if (err) throw err;
//         let users = JSON.parse(data);
//         for (let i=0; i<users.length; i++){
//             usersArray.push(users[i].username)
//         }
//         // console.log(usersArray)
//         res.send(usersArray);
//     })
// }


module.exports = function(db, app) {
    app.post('/findUsers', function(req, res){
        usersArray = [];
        var collection = db.collection('users');
        collection.find({}).toArray((err, users)=>{
            for (i in users){
                usersArray.push(users[i].username);
            }
            res.send(usersArray);
        })
    })
}