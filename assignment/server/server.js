const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(http);
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var rooms = ['Group1-General'];
require('./listen.js').listen(http);
require('./sockets.js').connect(io, rooms);
// app.post('/api/auth', require('./routes/postLogin'));
// app.post('/addUser', require('./routes/addUser'));
// app.post('/findUsers', require('./routes/findUsers'));
// app.post('/delUser', require('./routes/delUser'));
// app.post('/findGroups', require('./routes/findGroups'));
// app.post('/findChannels', require('./routes/findChannels'));
// app.post('/addGroup', require('./routes/addGroup'));
// app.post('/addChannel', require('./routes/addChannel'));
// app.post('/deleteGroup', require('./routes/deleteGroup'));
// app.post('/deleteChannel', require('./routes/deleteChannel'));
// app.post('/renameGroup', require('./routes/renameGroup'));
// app.post('/upgradeUser', require('./routes/upgradeUser'));
// app.post('/findInvite', require('./routes/findInvite'));
// app.post('/sendGroupInvite', require('./routes/sendGroupInvite'));
// app.post('/findChannelInvite', require('./routes/findChannelInvite'));
// app.post('/sendChannelInvite', require('./routes/sendChannelInvite'));
// app.post('/deleteFromGroup', require('./routes/deleteFromGroup'));
app.post('/sendDeleteFromGroup', require('./routes/sendDeleteFromGroup'));
app.post('/deleteFromChannel', require('./routes/deleteFromChannel'));
app.post('/sendDeleteFromChannel', require('./routes/sendDeleteFromChannel'));

const url = 'mongodb://localhost:27017';
MongoClient.connect(url, function(err, client) {
    if (err) {return console.log(err)}
    const dbName = 'assignment';
    const db = client.db(dbName);
    require('./routes/postLogin')(db, app); //done
    require('./routes/findGroups')(db, app);
    require('./routes/findChannels')(db,app, ObjectID);
    // require('./routes/addUser')(db, app);
    // require('./routes/findInvite')(db, app);
    // require('./routes/findChannelInvite')(db, app);
    // require('./routes/deleteGroup')(db, app);
    // require('./routes/deleteFromGroup')(db, app);
    // require('./routes/findUsers')(db, app);
    // require('./routes/delUser')(db, app);
    // require('./routes/upgradeUser')(db, app);
    // require('./routes/addGroup')(db, app);
    // require('./routes/addChannel')(db, app);
    // require('./routes/deleteChannel')(db, app);
    // require('./routes/renameGroup')(db, app);
    // require('./routes/sendGroupInvite')(db, app);
    // require('./routes/sendChannelInvite')(db, app);



})

// db.groups.insertOne({"groupName":"Group2", "members":[ObjectId("5f71dcf94f9ab96874e19789"), ObjectId("5f71dd354f9ab96874e1978a")], "channels":[{"channelName":"General","members":[ObjectId("5f71dcf94f9ab96874e19789"), ObjectId("5f71dd354f9ab96874e1978a")]},{"channelName":"Channel2","members":[]}]})