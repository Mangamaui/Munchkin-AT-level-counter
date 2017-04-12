let React =  require('react');
let player = require('../lib/player');
let LevelCounter = require('./LevelCounter');

class PlayerBadge extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentAvatar: 1,
      currentPlayer: player.create()
    };

    this.state.currentPlayer.setPlayer({name:"Claudia", tablePosition:1, characterLevel:0, gearLevel:0});
  }

  notify() {
    this.forceUpdate();
  }

  render() {
    const notify = this.notify.bind(this);

    return (
      <div className="PlayerBadge">
        <h2>{this.state.currentPlayer.name}</h2>
        <p>{this.state.currentPlayer.tablePosition}</p>
        <LevelCounter levelType="characterLevel" currentPlayer={this.state.currentPlayer} notify={notify} />
        <LevelCounter levelType="gearLevel" currentPlayer={this.state.currentPlayer} notify={notify} />
        <p>{this.state.currentPlayer.combatLevel}</p>
      </div>
    );
  }
}

module.exports = PlayerBadge;
