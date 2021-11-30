// var gameState = {
//   rooms: {
//     "44564": {
//       gameStarted: false,
//       players: {team1: [], team2: []},
//       puck: {}
//     }
//   }
// }

const { Puck } = require('./components/Puck')
const { Player } = require('./components/Player')
const { Gate } = require('./components/Gate')

var fieldWidth = 800;
var fieldHeight = 500;
var gateHeight = 280;
var gateWidth = 15;

var puck,
    gate1,
    gate2

function Game(rooms) {
  this.rooms = rooms;
  this.fieldWidth = 800;
  this.fieldHeight = 500;

  this.team1Score = 0;
  this.team2Score = 0;

  this.gameStarted = false;

  this.init = () => {
    puck = new Puck(fieldWidth / 2, fieldHeight / 2, 40)
    gate1 = new Gate(0, fieldHeight / 2 - gateHeight / 2, gateWidth, gateHeight);
    gate2 = new Gate(
      fieldWidth - gateWidth,
      fieldHeight / 2 - gateHeight / 2,
      gateWidth,
      gateHeight
  );
  }

  this.startGame = () => {
    this.gameStarted = true;
    this.gameLoop();
  }

  this.gameLoop = () => {

    setInterval(() => this.gameLoop(), 1000 / 60);
  }

}

module.exports = {
  fieldWidth,
  fieldHeight, 
  Game
}