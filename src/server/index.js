var port = process.env.PORT || 3000;

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(port);
console.log('Listening on localhost:' + port);
