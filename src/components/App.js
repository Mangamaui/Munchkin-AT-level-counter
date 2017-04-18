//layout, routers
let React =  require('react');
let game = require('../lib/game');
let PlayerCreator = require('./PlayerCreator');
let PlayerBadge = require('./PlayerBadge');
let CurrentPlayerModal = require('./CurrentPlayerModal');


class App extends React.Component {
  constructor() {
    super();
      this.state = {
        currentGame: null, //temp
        nextView: null
      }
  }

  render() {

    return(
      <div className="App">

      {this._loadViews().call(this)}

      </div>
    )
  }

  _loadViews() {
    if(this.state.currentGame === null) {
      return this._loadStartView;
    } else {

      let viewToShow = null;

      switch (this.state.nextView) {
        case 1:
          viewToShow = this._loadPlayerOverview;
          break;

        case 2:
          viewToShow = this._loadPlayerModal;
          break;

        case 3:
          viewToShow = this._loadWinnerView;
          break;

        default:
          viewToShow = this._loadNewGameView;
      }

      return viewToShow;
    }
  }

  _loadStartView() {
    return (
      <div className="test">
      <p>Start a new game or load an old one to get your game started!</p>
      <button className="start-btn" onClick={this.clickHandler.bind(this)}>Start Game</button>
      <button className="load-btn" onClick={this._loadGame.bind(this)}>Load Game</button>
      </div>
    )
  }

  _loadNewGameView() {
    return (
      <div>
        <p>Start by adding new players to your game session:</p>
        <PlayerCreator currentGame={this.state.currentGame} />
        <button className="start-btn" onClick={this.nextView.bind(this)}>Start the game</button>
      </div>
    )
  }

  _loadPreviousGameView(){
  }


  _loadPlayerOverview(){
    let list = this.state.currentGame.playerList.map(function(player){
        return <PlayerBadge key={player.id} currentPlayer={player} />;
    })

    return (
      <div>
        {list}
        <button>Start Playing!</button>
      </div>
    )
  }

  _loadPlayerModal() {
    let playerLoad = this._loadActivePlayer();

    console.log(this.state.currentGame);

    return (
      <div>
        <CurrentPlayerModal currentPlayer={playerLoad} currentGame={this.state.currentGame} />
        <button className="nextTurn-btn" onClick={this.nextView.bind(this)}>End turn</button>
      </div>
    )
  }

  _loadWinnerView() {
    let playerLoad = this._loadActivePlayer();
    return (
      <div>
      <h2>{playerLoad.name} is the winner!!!</h2>
        <PlayerBadge currentPlayer={playerLoad} />
      </div>
    )
  }

  clickHandler() {
    this.setState({currentGame: game.create()});
  }

  _loadGame() {
    console.log("loading...");
    game.load();
  }

  nextView() {
    if(this.state.currentGame.winner === null){
      this.state.currentGame.updateActivePlayer();
      console.log("saving...");
      game.save(this.state.currentGame);
      this.setState({nextView: 2});
    } else {
      this.setState({nextView: 3});
    }

  }

  _loadActivePlayer() {
    let activePlayer = this.state.currentGame.activePlayer;
    return this.state.currentGame.playerList.find(function(player){
      return player.tablePosition === activePlayer;
    })
  }
}


module.exports = App;
