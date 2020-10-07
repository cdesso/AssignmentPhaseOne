const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(http);
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const formidable = require('formidable');
const url = 'mongodb://localhost:27017';
module.exports = app;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Path join for image support
app.use(express.static(path.join(__dirname, '../dist/assignment/')));
app.use('/images', express.static(path.join(__dirname, './userImages')));

require('./listen.js').listen(http);

//Connect to DB
MongoClient.connect(url, function(err, client) {
    if (err) {return console.log(err)}
    const dbName = 'assignment';
    const db = client.db(dbName);
    require('./routes/postLogin')(db, app); // Route responsible for user authentication
    require('./routes/findGroups')(db, app); // Route responsible for finding user's groups
    require('./routes/findChannels')(db,app); // Route responsible for finding user's channels
    require('./routes/addUser')(db, app); // Route responsible for adding a new user
    require('./routes/findInvite')(db, app); // Route responsible for finding users to invite to a group
    require('./routes/findChannelInvite')(db, app); // Route responsible for finding users to invite to a channel
    require('./routes/deleteGroup')(db, app); // Route responsible for deleting a group
    require('./routes/deleteFromGroup')(db, app); // Route responsible for finding users to remove from a group
    require('./routes/findUsers')(db, app); // Route responsible for finding all users
    require('./routes/delUser')(db, app); // Route responsible for deleting a user
    require('./routes/upgradeUser')(db, app); // Route responsible for changing a user's role to Super Admin
    require('./routes/addGroup')(db, app); // Route responsible for adding a new group
    require('./routes/addChannel')(db, app); // Route responsible for adding a new channel
    require('./routes/deleteChannel')(db, app); // Route responsible for deleting a channel
    require('./routes/renameGroup')(db, app); // Route responsible for renaming a group
    require('./routes/sendGroupInvite')(db, app); // Route responsible for adding a user to a group
    require('./routes/sendChannelInvite')(db, app); // Route responsible for adding a user to a channel
    require('./routes/sendDeleteFromGroup')(db,app); // Route responsible for deleting a user from a group
    require('./routes/deleteFromChannel')(db, app); // Route responsible for finding users to delete from a channel
    require('./routes/sendDeleteFromChannel')(db, app); // Route responsible for deleting a user from a channel

    require('./routes/uploads')(db, app, formidable); // Route responsible for image uploads to server

    require('./sockets.js').connect(io, db); // Route responsible for socket support (chat)

    require('./unitTest/getDB')(db, app); // Route to retreive all data in DB
    require('./unitTest/clearDB')(db, app); // Route to clear the DB
    require('./unitTest/restoreDB')(db, app); // Route to restore the DB data

})
