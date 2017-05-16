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
        <img className="stone_slab" src="assets/images/stone_slab_80.svg" />
        <img className="PlayerBadge_avatar" src={this._getAvatar()} />
        <p className="PlayerBadge_name">{this.props.currentPlayer.name}</p>
        <p className="PlayerBadge_level">{this.props.currentPlayer.characterLevel}</p>
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
