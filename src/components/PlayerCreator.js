let React = require('react');
let AvatarSelector = require('./AvatarSelector');
let UpdateAvailableAvatars = require('../lib/avatars').UpdateAvailableAvatars;
let player = require('../lib/player');

class PlayerCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: null,
      avatarSelector: null,
      tablePosition: 0,
      disabled: false
    };
  }

  render() {
    return(
      <div className="PlayerCreator">
        <input type="text" id="playerName" placeholder="Add player name" onChange={this.changeHandler.bind(this)}/>
        <AvatarSelector ref={c => this.state.avatarSelector = c} />
        <button className="add-player-btn button button_secundary" onClick={this.clickHandler.bind(this)}
          disabled={this.state.disabled}>Add player</button>
      </div>
    )
  }

  changeHandler(e) {
    this.setState(
      { [e.target.id]: e.target.value }
    );
  }

  clickHandler(e) {
    let game = this.props.currentGame;
    let limit = game.addPlayerToGame({
      name: this.state.playerName,
      avatar: this.state.avatarSelector.state.selectedAvatarID,
      tablePosition: (this.state.tablePosition+=1)
    });

    UpdateAvailableAvatars(this.state.avatarSelector.state.selectedAvatarID);

    if (limit) {
      this.setState({disabled: true});
    }

    this.props.notify();
  }
}

module.exports = PlayerCreator;
