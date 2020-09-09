const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(http);
const bodyParser = require("body-parser")

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



require('./listen.js').listen(http);
require('./sockets.js').connect(io);
app.post('/api/auth', require('./routes/postLogin'));
app.post('/addUser', require('./routes/addUser'));
app.post('/findUsers', require('./routes/findUsers'));
app.post('/delUser', require('./routes/delUser'));
app.post('/findGroups', require('./routes/findGroups'));
app.post('/findChannels', require('./routes/findChannels'));
app.post('/addGroup', require('./routes/addGroup'));
app.post('/addChannel', require('./routes/addChannel'));
app.post('/deleteGroup', require('./routes/deleteGroup'));
app.post('/deleteChannel', require('./routes/deleteChannel'));
app.post('/renameGroup', require('./routes/renameGroup'));
app.post('/upgradeUser', require('./routes/upgradeUser'));
app.post('/findInvite', require('./routes/findInvite'));
app.post('/sendGroupInvite', require('./routes/sendGroupInvite'));
app.post('/deleteFromGroup', require('./routes/deleteFromGroup'));
app.post('/sendDeleteFromGroup', require('./routes/sendDeleteFromGroup'));