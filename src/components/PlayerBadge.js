let React = require('React');
let player = require('../lib/player');
let AvatarList = require('../lib/avatars').AvatarList;


class PlayerBadge extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="PlayerBadge">
        <p className="playerName"><b>{this.props.currentPlayer.name}</b></p>
        <img className="playerAvatar" src={this._getAvatar()} />
        <p>Character Level:<br /><span>{this.props.currentPlayer.characterLevel}</span></p>
      </div>
    )
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

module.exports = PlayerBadge;
