let player = require('./player');

const game = {
  playerList: [],
  activePlayer: null,
  nextPlayer: null,
  winner: null,
  saveGame: false,

  addPlayerToGame: function(obj){
    if(this.playerList.length < 6) {
      const NEW_PLAYER = player.create();
      Object.assign(NEW_PLAYER, obj);
      this.playerList.push(NEW_PLAYER);

      if(this.playerList.length === 6) {
        return true;
      } else {
        return false;
      }
    }
  },
  updateActivePlayer: function() {
    if(this.activePlayer === null && !this.saveGame) {
      this.activePlayer = 1;
      this.nextPlayer = 2;
    } else if (this.activePlayer && !this.saveGame ) {
      this.activePlayer = this.nextPlayer;
      if((this.nextPlayer+1) > this.playerList.length) {
        this.nextPlayer = 1;
      } else {
        this.nextPlayer++;
      }
    }
  },

  checkIfActivePlayerWins: function() {
    const ACTIVE_PLAYER = this.activePlayer;
    let currentPlayer = this.playerList.find(function(player){
      return player.tablePosition === ACTIVE_PLAYER;
    });

    if(currentPlayer.characterLevel === 10) {
      this.winner = currentPlayer.id;
      return true;
    } else {
      return false;
    }
  }
}


module.exports.create = function() {
  game.playerList = [];
  return Object.assign({}, game);
};

module.exports.save = function(game) {
  localStorage.setItem("previousGame", JSON.stringify(game));
};

module.exports.load = function() {
  if(!localStorage.getItem("previousGame")) {
    return false;
  } else {
    let unmergedSaveGame = JSON.parse(localStorage.getItem("previousGame"));
    let mergedSaveGame =  Object.assign({}, game, unmergedSaveGame);
    mergedSaveGame.saveGame = true;
    mergedSaveGame.playerList = mergedSaveGame.playerList.map(function(p) {
      return Object.assign({}, player.playerObj, p);
    });

    return mergedSaveGame;
  }
};

module.exports.removeSaveGame = function() {
  localStorage.clear();
};
