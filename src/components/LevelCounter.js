let React =  require('react');

class LevelCounter extends React.Component {

  render() {
    return (
      <div className="LevelCounter">
        <h3>{this._setLevelTypeTitle()}</h3>
        <button className="level_down" onClick={this.clickHandler("decrease").bind(this)}>-</button>
        <p>{this.props.currentPlayer[this.props.levelType]}</p>
        <button className="level_up" onClick={this.clickHandler("increase").bind(this)}>+</button>
      </div>
    )
  }

  clickHandler(action) {
    let lvlType = this._setToUpperCase();

    return function() {
      this.props.currentPlayer[action + lvlType]();
      this.props.currentPlayer.updateCombatLevel();
      this.props.notify();
    };
  }
  _setLevelTypeTitle() {
    let lvlType = this._setToUpperCase();
    let pos = lvlType.indexOf("Level");
    let word = lvlType.slice(0,pos) + " " + lvlType.slice(pos) + ":";
    return word;
  }

  _setToUpperCase() {
    let word = this.props.levelType;
    word = word.charAt(0).toUpperCase() + word.slice(1);
    return word
  }

}

module.exports = LevelCounter;
