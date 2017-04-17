let player = require('./player');

const counter = 0;

const game = {
  id: "",
  playerList: [],
  activePlayer: null,
  nextPlayer: null,

  saveGame: function() {
    localStorage.setItem("previousGame",this.currentGame);
  },
  loadGame: function() {
    if(!localStorage.getItem("previousGame")) {
      let msg = "There was no previous game saved";
    } else {
      let previousGame = localStorage.getItem("previousGame");

      this.currentGame.playerList = previousGame.playerList;
    }
  },
  createPlayer: function() {
    this.playerList.push(player.create());
  }
}
