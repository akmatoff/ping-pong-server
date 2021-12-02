const http = require('http');
const server = http.createServer();
const socketio = require("socket.io");
const randomstring = require("randomstring")

const { Game, FRAME_RATE, fieldWidth, fieldHeight } = require("./src/game")
const { Player } = require("./src/components/Player");

const io = socketio(server, {
  cors: {
    origin: "*",
    credentials: true
  }
})

server.listen(5000, () => {
  console.log('listening on *:3000');
});

function gameStateUpdate(gameState, game) {
    setInterval(() => {
        game.update() // animate the game objects
        io.sockets.emit('gameState', gameState) // send game state to all the sockets
        console.log('STATE', gameState)
    }, 1000 / FRAME_RATE)
}

const state = {}; // {"gameCode/roomName": {gameState}}
const rooms = {};

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('newGame', () => {
        // Generate a game code
        let gameCode = randomstring.generate({length: 5, charset: 'alphanumeric'})

        // {id of the user: game code}
        rooms[socket.id] = gameCode;

        // Initialize a new game
        const game = new Game();
        game.init();

        // New player object
        let player = new Player(Math.random(fieldWidth / 2) * fieldWidth / 2, Math.random(fieldHeight) * fieldHeight, 50)

        // Add player to the game state
        game.gameState.players[socket.id] = player;

        // Create gameCode with the game state in the global state
        state[gameCode] = game.gameState;

        // Connect to the room 
        socket.join(gameCode);
        socket.number = 1;  

        socket.emit('playerNumber', 1)
        socket.emit('gameCode', gameCode)

        gameStateUpdate(game.gameState, game)
    })

    socket.on('joinGame', joinGame)

    function joinGame(gameCode) {
      const room = io.sockets.adapter.rooms.get(gameCode); // Search for rooms with the gamecode

      let players;
  
      // If room is found
      if (room) players = room;

      let playersCount = players ? players.size : 0;
  
      if (playersCount === 0) {
          socket.emit('gameNotFound')
          return;
      } else if (playersCount > 8) {
          socket.emit('gameIsFull')
          return;
      }
  
      rooms[socket.id] = gameCode;
  
      socket.join(gameCode)

      let player = new Player(Math.random(fieldWidth / 2) * fieldWidth / 2, Math.random(fieldHeight) * fieldHeight, 50)

      // Add the new player to the state
      state[gameCode].players[socket.id] = player;

      console.log(room)
  }

  socket.on('newGameState', (newGameState, gameCode) => {
    state[gameCode] = newGameState;
  })
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});

module.exports = {
  io
}