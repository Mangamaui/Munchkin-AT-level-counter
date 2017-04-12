let player = require('./player');

const game = {
  playerList: [],
  nextTurn: "playerID",
  
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
