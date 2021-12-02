// var gameState = {
//       gameStarted: false,
//       players: {team1: [], team2: []},
//       puck: {}
// }

const { Puck } = require("./components/Puck");
const { Gate } = require("./components/Gate");

var fieldWidth = 800;
var fieldHeight = 500;
var gateHeight = 280;
var gateWidth = 15;

var puck, gate1, gate2;

const FRAME_RATE = 60;

function Game() {
    this.gameState = {players: {}, puck: {}, gate1: {}, gate2: {}}
    this.fieldWidth = 800;
    this.fieldHeight = 500;

    this.team1Score = 0;
    this.team2Score = 0;

    this.gameStarted = false;

    this.init = () => {
        puck = new Puck(fieldWidth / 2, fieldHeight / 2, 40);
        gate1 = new Gate(
            0,
            fieldHeight / 2 - gateHeight / 2,
            gateWidth,
            gateHeight
        );
        gate2 = new Gate(
            fieldWidth - gateWidth,
            fieldHeight / 2 - gateHeight / 2,
            gateWidth,
            gateHeight
        );

        this.gameState["gate1"] = gate1;
        this.gameState["gate2"] = gate2;
        this.gameState["gameStarted"] = this.gameStarted;
    };

    this.startGame = () => {
        this.gameStarted = true;
        this.gameState["gameStarted"] = this.gameStarted;
    };

    this.update = () => {
        puck.animate()
        this.gameState["puck"] = puck;
    }
}

module.exports = {
    fieldWidth,
    fieldHeight,
    Game,
    FRAME_RATE
};
