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
app.use(express.static(path.join(__dirname, '../dist/assignment/')));
app.use('/images', express.static(path.join(__dirname, './userImages')));

require('./listen.js').listen(http);

MongoClient.connect(url, function(err, client) {
    if (err) {return console.log(err)}
    const dbName = 'assignment';
    const db = client.db(dbName);
    require('./routes/postLogin')(db, app);
    require('./routes/findGroups')(db, app);
    require('./routes/findChannels')(db,app);
    require('./routes/addUser')(db, app);
    require('./routes/findInvite')(db, app);
    require('./routes/findChannelInvite')(db, app);
    require('./routes/deleteGroup')(db, app);
    require('./routes/deleteFromGroup')(db, app);
    require('./routes/findUsers')(db, app);
    require('./routes/delUser')(db, app);
    require('./routes/upgradeUser')(db, app);
    require('./routes/addGroup')(db, app);
    require('./routes/addChannel')(db, app);
    require('./routes/deleteChannel')(db, app);
    require('./routes/renameGroup')(db, app);
    require('./routes/sendGroupInvite')(db, app);
    require('./routes/sendChannelInvite')(db, app);
    require('./routes/sendDeleteFromGroup')(db,app);
    require('./routes/deleteFromChannel')(db, app);
    require('./routes/sendDeleteFromChannel')(db, app);

    require('./routes/uploads')(db, app, formidable);

    require('./sockets.js').connect(io, db);
})
