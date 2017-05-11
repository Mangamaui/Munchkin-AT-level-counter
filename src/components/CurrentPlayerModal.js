let React =  require('react');
let player = require('../lib/player');
let LevelCounter = require('./LevelCounter');
let getAvatar = require('../lib/avatars').GetAvatar;

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
      <div className="current_player_modal" onClick={this.clickHandler.bind(this)}>
        <img className="current_player_modal__avatar" src={this._getAvatar()} />
        <h2 className="current_player_modal__name">{this.props.currentPlayer.name}</h2>
        <LevelCounter levelType="characterLevel" currentPlayer={this.props.currentPlayer} notify={notify} />
        <LevelCounter levelType="gearLevel" currentPlayer={this.props.currentPlayer} notify={notify} />
        <h3 className="current_player_modal__combat_level_label">Combat level</h3>
        <p className="current_player_modal__combat_level"> {this.props.currentPlayer.combatLevel}</p>
      </div>
    );
  }

  clickHandler(e) {
    this.state.currentGame.checkIfActivePlayerWins();
  }

  _getAvatar() {
    return getAvatar(this.props.currentPlayer.avatar);
  }
}

module.exports = CurrentPlayerModal;
