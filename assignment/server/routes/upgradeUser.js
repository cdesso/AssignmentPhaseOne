// var fs = require('fs');

// module.exports = function(req, res) {
//     var id = req.body[0];
//     fs.readFile('./data/userData.json', 'utf8', function(err, data){
//         if (err) throw err;
//         let users = JSON.parse(data);
//         if (users[id].role != 'SA'){
//             users[id].role = 'SA';
//             fs.writeFile('./data/userData.json', JSON.stringify(users), 'utf8', function(err){
//                 if (err) throw err;
//                 res.send(true);
//             });
//         } else {
//             res.send(false);
//         }
//     })
// }

module.exports = function(db, app) {
    app.post('/upgradeUser', function(req, res){
        var uName = req.body[0];
        var collection = db.collection('userData');
        collection.updateOne({'username': uName}, {$set: {'role': 'SA'}},(err, docs)=>{
            if (err) throw err;
            res.send(true);
        })
    });
}