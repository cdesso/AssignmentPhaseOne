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
app.post('/api/auth', require('./postLogin'));
app.post('/userCreate', require('./userCreate'));
app.post('/findUsers', require('./findUsers'));
app.post('/delUser', require('./delUser'));
app.post('/findGroups', require('./findGroups'));
app.post('/findChannels', require('./findChannels'));