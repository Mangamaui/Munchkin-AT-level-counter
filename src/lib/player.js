const counter = 0;

const player = {
  id: "Player",
  name: "Player",
  avatar: "",
  tablePosition: 0,
  characterLevel: 0,
  gearLevel: 0,
  combatLevel: 0,

  setPlayer: function(obj) {
    Object.assign(this, obj);
  },
  updateCombatLevel: function() {
    this.combatLevel = this.characterLevel + this.gearLevel;
  },
  increaseCharacterLevel: function() {
    if(this.characterLevel < 10){
      this.characterLevel+=1;
    }
  },
  decreaseCharacterLevel: function() {
    if(this.characterLevel > 0){
      this.characterLevel-=1;
    }
  },
  increaseGearLevel: function() {
    this.gearLevel+=1;
  },
  decreaseGearLevel: function() {
    if(this.gearLevel > 0 ) {
      this.gearLevel-=1;
    }
  }
};


module.exports.create = function() {
  let newPlayer = Object.assign({}, player);
  newPlayer.id = counter+1;
  return newPlayer;
};
