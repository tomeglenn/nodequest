var app = require('http').createServer();
var io = require('socket.io').listen(app);

var port = process.env.port || 3000;
app.listen(port);

console.log('Listening on localhost:' + port);

io.on('connect', function(socket) {
  console.log('client connected: ' + socket.id);

  io.broadcast.emit('connected', socket.id);

  socket.on('disconnect', function() {
    console.log('client disconnected: ' + socket.id);
  });
});
