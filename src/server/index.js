var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});


server.listen(port);
console.log('Listening on localhost:' + port);

io.on('connect', function(socket) {
  console.log('client connected: ' + socket.id);

  io.broadcast.emit('connected', socket.id);

  socket.on('disconnect', function() {
    console.log('client disconnected: ' + socket.id);
  });
});
