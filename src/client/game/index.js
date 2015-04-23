var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game');

var mainState = {
  preload: function() {
    game.load.image('ball', '/game/assets/sprites/ball.png');
  },

  create: function() {
    var connectionHandler = new ConnectionHandler();
  },

  update: function() {

  }
}

game.state.add('main', mainState);
game.state.start('main');

/* CONNECTION HANDLER */
var ConnectionHandler = function () {
  this.socket = io('localhost:3000');
  this.players = [];
  this.init();
};

ConnectionHandler.prototype.init = function() {
  this.socket.on('player_joined', function(playerData) {
    addPlayerSprite(playerData);
  });

  this.socket.on('game_state', function(playersData) {
    for(var i = 0; i < playersData.length; i++) {
      addPlayerSprite(playersData[i]);
    }
  });

  this.socket.on('player_quit', function(playerId) {
    var player = undefined;
    for(var i = 0; i < players.length; i++) {
      if (players[i].id == playerId) {
        players = players[i];
        players.splice(i, 1);
      }
    }

    if (player) {
      player.destroy();
    }
  });
};

/* PLAYER */
var Player = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'ball');
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function () {

}

/* HELPER */
function addPlayerSprite(playerData) {
  var player = new Player(game, playerData.position.x, playerData.position.y);
  player.id = playerData.id;
  game.add.existing(player);
  players.push(player);
}
