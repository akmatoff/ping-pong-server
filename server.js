const http = require('http');
const express = require('express')
const server = http.createServer();
const app = express(server)
const socketio = require("socket.io");
const randomstring = require("randomstring")

const { Game, FRAME_RATE } = require("./src/game")

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

function gameStateUpdate(gameState) {
    setInterval(() => {
        io.sockets.emit('gameState', gameState)
    }, 1000 / FRAME_RATE)
}

const state = {}; // {"gameCode/roomName": {gameState}}
const rooms = {};

io.on('connection', (socket) => {
    console.log('a user connected');  

    socket.on('newGame', () => {
        let gameCode = randomstring.generate({length: 5, charset: 'alphanumeric'})

        rooms[socket.id] = gameCode;

        const game = new Game();
    
        game.init();

        state[gameCode] = game.gameState;

        socket.join(gameCode);
        socket.number = 1;

        socket.emit('playerNumber', 1)
        socket.emit('gameCode', gameCode)

    })
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});

module.exports = {
  io
}