let React =  require('react');
let AvatarList = require('../lib/avatars').AvailableAvatarList;

class AvatarSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shownAvatarIndex: 1,
      selectedAvatarID: AvatarList[0].id
    };
  }

  render() {
    return (
      <div className="AvatarSelector">
        <button className="previous-btn button button_tertiary" onClick={this._previousAvatar.bind(this)}><i className="icon icon-arrow-left-thick"></i><span>previous</span></button>
          <div className="avatar">
            <img src={AvatarList[this.state.shownAvatarIndex-1].image} />
          </div>
        <button className="next-btn button button_tertiary" onClick={this._nextAvatar.bind(this)}><i className="icon icon-arrow-right-thick"></i><span>next</span></button>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({selectedAvatarID: AvatarList[0].id});
  }

  _nextAvatar() {
    if (this.state.shownAvatarIndex === AvatarList.length) {
      //disable button or cycle back to first
      this.setState({shownAvatarIndex: 1}, () => this._updateSelectedAvatar());
    } else {
      this.setState({shownAvatarIndex: this.state.shownAvatarIndex+1}, () => this._updateSelectedAvatar());
    }
  }

  _previousAvatar() {
    if (this.state.shownAvatarIndex === 1) {
      //disable button or cycle back to last
      this.setState({shownAvatarIndex: AvatarList.length }, () => this._updateSelectedAvatar());
    } else {
      this.setState({shownAvatarIndex: this.state.shownAvatarIndex -1}, () => this._updateSelectedAvatar());
    }
  }

  _updateSelectedAvatar() {
    let id = AvatarList[this.state.shownAvatarIndex-1].id;
    this.setState({selectedAvatarID: id });
  }
};

module.exports = AvatarSelector;
