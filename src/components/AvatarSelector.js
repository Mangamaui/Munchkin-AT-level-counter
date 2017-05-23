let React =  require('react');
// non-components
let avatars = require('../lib/avatars');
let avatarList = require('../lib/avatars').availableAvatarList;
//components
let CustomButton = require('./button');

class AvatarSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shownAvatarIndex: 1 };
  }

  render() {
    return (
      <div className="AvatarSelector">
        <CustomButton button_class="previous-btn button_tertiary" button_handler={this.previousAvatar.bind(this)} button_text="previous">
          <i className="icon icon-arrow-left-thick"></i>
        </CustomButton>
          <div className="avatar">
            <img src={avatarList[this.state.shownAvatarIndex-1].image} />
          </div>
          <CustomButton button_class="next-btn button_tertiary" button_handler={this.nextAvatar.bind(this)} button_text="next">
            <i className="icon icon-arrow-right-thick"></i>
          </CustomButton>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!avatarList[this.state.shownAvatarIndex - 1]) {
      this.setState({shownAvatarIndex: 1});
    }
  }

  nextAvatar() {
    if (this.state.shownAvatarIndex === avatarList.length) {
      //disable button or cycle back to first
      this.setState(
        {shownAvatarIndex: 1},
        () => this.updateSelectedAvatar()
      );
    } else {
      this.setState(
        {shownAvatarIndex: this.state.shownAvatarIndex + 1},
        () => this.updateSelectedAvatar()
      );
    }
  }

  previousAvatar() {
    if (this.state.shownAvatarIndex === 1) {
      //disable button or cycle back to last
      this.setState(
        {shownAvatarIndex: avatarList.length },
        () => this.updateSelectedAvatar()
      );
    } else {
      this.setState(
        {shownAvatarIndex: this.state.shownAvatarIndex - 1},
        () => this._updateSelectedAvatar()
      );
    }
  }

  updateSelectedAvatar() {
    let id = avatarList[this.state.shownAvatarIndex - 1].id;
    avatars.selectedAvatarID = id;
  }
};

module.exports = AvatarSelector;
