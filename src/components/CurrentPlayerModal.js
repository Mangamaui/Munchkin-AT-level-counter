let React =  require('react');
let player = require('../lib/player');
let LevelCounter = require('./LevelCounter');
let AvatarList = require('../lib/avatars').AvatarList;

class CurrentPlayerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentAvatar: null,
    };

  }

  notify() {
    this.forceUpdate();
  }

  render() {
    console.log(this.props.currentPlayer);
    const notify = this.notify.bind(this);

    return (
      <div className="CurrentPlayerModal">
        <h2>{this.props.currentPlayer.name}</h2>
        <img src={this._getAvatar()} />
        <p>{this.props.currentPlayer.tablePosition}</p>
        <LevelCounter levelType="characterLevel" currentPlayer={this.props.currentPlayer} notify={notify} />
        <LevelCounter levelType="gearLevel" currentPlayer={this.props.currentPlayer} notify={notify} />
        <p>CombatLevel: {this.props.currentPlayer.combatLevel}</p>
      </div>
    );
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
