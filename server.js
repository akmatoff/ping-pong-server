const http = require('http');
const express = require('express')
const server = http.createServer();
const app = express(server)
const socketio = require("socket.io");

const { Game } = require("./src/game")

const io = socketio(server, {
  cors: {
    origin: "*",
    credentials: true
  }
})

app.use(express.static(__dirname + 'public'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

server.listen(5000, () => {
  console.log('listening on *:3000');
});


io.on('connection', (socket) => {
  console.log('a user connected');  

  const game = new Game({});
  
  game.init();
  game.startGame();

  socket.on('gameLoop', () => {
    game.gameLoop();
  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

module.exports = {
  io
}