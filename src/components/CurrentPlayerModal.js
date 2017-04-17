let React =  require('react');
let player = require('../lib/player');
let LevelCounter = require('./LevelCounter');
let AvatarList = require('../lib/avatars').AvatarList;

class CurrentPlayerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentGame: props.currentGame
    };

  }

  notify() {
    this.forceUpdate();
  }

  render() {
    const notify = this.notify.bind(this);

    return (
      <div className="CurrentPlayerModal" onClick={this.clickHandler.bind(this)}>
        <h2>{this.props.currentPlayer.name}</h2>
        <img src={this._getAvatar()} />
        <LevelCounter levelType="characterLevel" currentPlayer={this.props.currentPlayer} notify={notify} />
        <LevelCounter levelType="gearLevel" currentPlayer={this.props.currentPlayer} notify={notify} />
        <p>CombatLevel: {this.props.currentPlayer.combatLevel}</p>
      </div>
    );
  }

  clickHandler(e) {
    this.state.currentGame.checkIfActivePlayerWins();
  }

  _getAvatar() {
    let id = this.props.currentPlayer.avatar;
    let image = null;

    AvatarList.forEach(function(avatar) {
      if(avatar.id === id) {
         image = avatar.image;
      }
    });

    return image;
  }
}

module.exports = CurrentPlayerModal;
