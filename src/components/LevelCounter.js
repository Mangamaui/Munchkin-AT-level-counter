let React =  require('react');

class LevelCounter extends React.Component {

  render() {
    return (
      <div className="level_counter">
        <h3 className="level_counter__label">{this.setLevelTypeTitle()}</h3>
        <button className="level_down level_counter__button level_counter__button_down icon-minus" onClick={this.clickHandler("decrease").bind(this)}></button>
        <p className="level_counter__level level">{this.props.currentPlayer[this.props.levelType]}</p>
        <button className="level_up level_counter__button level_cunter__button_up icon-plus" onClick={this.clickHandler("increase").bind(this)}></button>
      </div>
    )
  }

  clickHandler(action) {
    const LVL_TYPE = this.setToUpperCase();

    return function() {
      this.props.currentPlayer[action + LVL_TYPE]();
      this.props.currentPlayer.updateCombatLevel();
      this.props.notify();
    };
  }
  setLevelTypeTitle() {
    let lvlType = this.setToUpperCase();
    const POS = lvlType.indexOf("Level");
    const WORD = lvlType.slice(0, POS) + " " + lvlType.slice(POS);
    return WORD;
  }

  setToUpperCase() {
    let word = this.props.levelType;
    word = word.charAt(0).toUpperCase() + word.slice(1);
    return word
  }

}

module.exports = LevelCounter;
