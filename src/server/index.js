var port = process.env.PORT || 3000;

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, { origins:'*:*' });

server.listen(port);
console.log('Listening on localhost:' + port);

io.on('connect', function(socket) {
  console.log('client connected: ' + socket.id);

  io.broadcast.emit('connected', socket.id);

  socket.on('disconnect', function() {
    console.log('client disconnected: ' + socket.id);
  });
});
