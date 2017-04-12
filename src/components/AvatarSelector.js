let React =  require('react');
let AvatarList = require('../lib/avatars').AvatarList;

class AvatarSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAvatar: 1
    };
  }

  render() {
    return (
      <div className="AvatarSelector">
        <button className="previous-btn" onClick={this._previousAvatar.bind(this)}>previous</button>
          <div className="avatar">
            <img src={AvatarList[this.state.currentAvatar-1].image} height="300px"/>
            <p><b>{AvatarList[this.state.currentAvatar-1].name}</b></p>
          </div>
        <button className="next-btn" onClick={this._nextAvatar.bind(this)}>next</button>
      </div>
    );
  }

  _nextAvatar() {
    if (this.state.currentAvatar === AvatarList.length) {
      //disable button or cycle back to first
      this.setState({currentAvatar: 1});
    } else {
      this.setState({currentAvatar: this.state.currentAvatar+1});
    }
  }

  _previousAvatar() {
    if (this.state.currentAvatar === 1) {
      //disable button or cycle back to last
      this.setState({currentAvatar: AvatarList.length });
    } else {
      this.setState({currentAvatar: this.state.currentAvatar -1});
    }
  }
};

module.exports = AvatarSelector;
