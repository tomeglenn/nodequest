var port = process.env.PORT || 3000;

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(port);
console.log('Listening on localhost:' + port);


var players = [];

io.on('connection', function(socket) {
  console.log('Client Connected { id : ' + socket.id + ' }');

  // Create a new player, tell the client about their own player
  // and also tell them the current state of the game
  var playerData = {
    id : socket.id,
    isMine : true,
    position : {
      x : randomBetween(0, 200),
      y : randomBetween(0, 200)
    }
  };

  socket.emit('player_joined', playerData);
  socket.emit('game_state', players);

  // Now update the isMine property (we are no longer talking to just the client)
  // And tell everyone else that a player has joined
  playerData.isMine = false;
  socket.broadcast.emit('player_joined', playerData);

  // Add the player to the list of connected players
  players.push(playerData);

  socket.on('disconnect', function() {
    for(var i = 0; i < players.length; i++) {
      if(players[i].id == socket.id) {
        players.splice(i, 1);
      }
    }

    io.emit('player_quit', socket.id);
  });
});


function randomBetween(min, max) {
  return Math.floor(Math.random() * ((max-min)+1) + min);
}
