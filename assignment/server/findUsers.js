var fs = require('fs');

module.exports = function(req, res) {
    usersArray = []
    fs.readFile('./data/users.json', 'utf8', function(err, data){
        if (err) throw err;
        let users = JSON.parse(data);
        for (let i=0; i<users.length; i++){
            usersArray.push(users[i].username)
        }
        // console.log(usersArray)
        res.send(usersArray);
    })
}