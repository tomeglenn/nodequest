var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game', {
  preload: function() {

  },
  create: function() {

  },
  update: function() {

  }
});

var socket = io('http://server-nodequest.herokuapp.com');
socket.on('connect', function() {
  alert('connected');
});
