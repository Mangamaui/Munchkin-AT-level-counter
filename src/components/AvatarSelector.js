let React =  require('react');
let avatars = require('../lib/avatars');
let AvatarList = require('../lib/avatars').AvailableAvatarList;
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
        <CustomButton button_class="previous-btn button_tertiary" button_handler={this._previousAvatar.bind(this)} button_text="previous">
          <i className="icon icon-arrow-left-thick"></i>
        </CustomButton>
          <div className="avatar">
            <img src={AvatarList[this.state.shownAvatarIndex-1].image} />
          </div>
          <CustomButton button_class="next-btn button_tertiary" button_handler={this._nextAvatar.bind(this)} button_text="next">
            <i className="icon icon-arrow-right-thick"></i>
          </CustomButton>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!AvatarList[this.state.shownAvatarIndex-1]) {
      this.setState({shownAvatarIndex: 1});
    }
  }

  _nextAvatar() {
    if (this.state.shownAvatarIndex === AvatarList.length) {
      //disable button or cycle back to first
      this.setState(
        {shownAvatarIndex: 1},
        () => this._updateSelectedAvatar()
      );
    } else {
      this.setState(
        {shownAvatarIndex: this.state.shownAvatarIndex+1},
        () => this._updateSelectedAvatar()
      );
    }
  }

  _previousAvatar() {
    if (this.state.shownAvatarIndex === 1) {
      //disable button or cycle back to last
      this.setState(
        {shownAvatarIndex: AvatarList.length },
        () => this._updateSelectedAvatar()
      );
    } else {
      this.setState(
        {shownAvatarIndex: this.state.shownAvatarIndex -1},
        () => this._updateSelectedAvatar()
      );
    }
  }

  _updateSelectedAvatar() {
    let id = AvatarList[this.state.shownAvatarIndex-1].id;
    avatars.selectedAvatarID = id;
  }
};

module.exports = AvatarSelector;
