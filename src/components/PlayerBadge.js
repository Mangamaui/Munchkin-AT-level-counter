let React = require('React');
// non-components
let player = require('../lib/player');
let avatarList = require('../lib/avatars').avatarList;
let getAvatar = require('../lib/avatars').getAvatar;

class PlayerBadge extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="PlayerBadge">
        <img className="stone_slab mobile_slab" src="assets/images/stone_slab_80.svg" />
        <img className="stone_slab desktop_slab" src="assets/images/stone_slab_300.svg" />
        <img className="PlayerBadge_avatar" src={this.loadAvatar()} />
        <p className="PlayerBadge_name PlayerBadge_text">{this.props.currentPlayer.name}</p>
        <p className="PlayerBadge_level PlayerBadge_text">{this.props.currentPlayer.characterLevel}</p>
      </div>
    )
  }

  loadAvatar() {
    return getAvatar(this.props.currentPlayer.avatar);
  }
}

module.exports = PlayerBadge;
