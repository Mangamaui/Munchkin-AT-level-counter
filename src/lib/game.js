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
  addPlayerToGame: function(obj){
    if(this.playerList.length < 6) {
      let newPlayer = player.create();
      Object.assign(newPlayer, obj);
      this.playerList.push(newPlayer);

      if(this.playerList.length === 6) {
        return "disabled";
      }
    }
  },
  updateActivePlayer: function() {
    console.log("active player: " + this.activePlayer);
    if(this.activePlayer === null) {
      this.activePlayer = 1;
      this.nextPlayer = 2;
    } else {
        this.activePlayer = this.nextPlayer;
        if((this.nextPlayer+1) > this.playerList.length) {
          this.nextPlayer = 1;
        } else {
          this.nextPlayer++;
        }
    }

    console.log("active player after: " + this.activePlayer);
    console.log("next player: " + this.nextPlayer);
  }
}




module.exports.create = function() {
  let newGame = Object.assign({}, game);
  newGame.id = counter+1;
  return newGame;
};
