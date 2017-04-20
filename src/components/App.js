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
      currentGame: null,
      nextView: null,
      notificationMsg: null,
      disabled: true,
      PlayerCreator: null
    }
  }

  notify() {
    this.checkPlayerMinimum();
    this.forceUpdate();
  }

  render() {
    return(
      <div className="App">
      {this._loadViews().call(this)}
      </div>
    )
  }

  /*

1 load splash
2 load app choices
3 new game - load player editor
4 new game - load player overview
5 new game - load active player - autosave
6 new game - load winner - reset


1 load game -  load player overview
2 load game - load active player - autosave
3 load game - load winner - reset

*/

/*====================================================*/
/*                   View Switcher                    */
/*====================================================*/
  _loadViews() {
    //console.log(this.state.currentGame);
    if(this.state.currentGame === null) {
      return this._startView;
    } else {

      let viewToShow = null;

      switch (this.state.nextView) {
        case 1:
          viewToShow = this._playerOverview;
          break;

        case 2:
          viewToShow = this._activePlayerView;
          break;

        case 3:
          viewToShow = this._winnerView;
          break;

        default:
          viewToShow = this._newGameView;
      }

      return viewToShow;
    }
  }
/*====================================================*/
/*                   View Templates                   */
/*====================================================*/
  _startView() {
    return (
      <div className="test">
      <p>Start a new game or load an old one to get your game started!</p>
      <button className="start-btn" onClick={this.newGameHandler.bind(this)}>Start Game</button>
      <button className="load-btn" onClick={this.loadGameHandler.bind(this)}>Load Game</button>
      </div>
    )
  }

  _newGameView() {
    const notify = this.notify.bind(this);
    return (
      <div>
        <p>Start by adding new players to your game session:</p>
        <PlayerCreator currentGame={this.state.currentGame} notify={notify} />
        <p>Players added to the game: <br /><span>{this.state.currentGame.playerList.length}</span></p>
        <button className="start-btn" onClick={this.overviewHandler.bind(this)} disabled={this.state.disabled}>Start the game</button>
      </div>
    )
  }

  _playerOverview() {
    let list = this.state.currentGame.playerList.map(function(player){
        return <PlayerBadge key={player.id} currentPlayer={player} />;
    })

    return (
      <div>
        {list}
        <button onClick={this.nextViewHandler.bind(this)}>Start Playing!</button>
      </div>
    )
  }

  _activePlayerView() {
    let playerLoad = this._loadActivePlayer();

    return (
      <div>
        <CurrentPlayerModal currentPlayer={playerLoad} currentGame={this.state.currentGame} />
        <button className="nextTurn-btn" onClick={this.nextViewHandler.bind(this)}>End turn</button>
      </div>
    )
  }

  _winnerView() {
    let playerLoad = this._loadActivePlayer();
    return (
      <div>
      <h2>{playerLoad.name} is the winner!!!</h2>
        <PlayerBadge currentPlayer={playerLoad} />
        <button className="newGame-btn" onClick={this.restartGameHandler.bind(this)}>Start New Game</button>
      </div>
    )
  }

/*====================================================*/
/*                    Event Handlers                  */
/*====================================================*/
  checkPlayerMinimum() {
    if(this.state.currentGame.playerList.length > 2){
      this.setState({disabled: false});
    }
  }

  newGameHandler() {
    this.setState({currentGame: game.create()});
  }

  restartGameHandler() {
    game.removeSaveGame();
    this.setState({nextView: null});
    this.setState({currentGame: game.create()});
  }

  loadGameHandler() {
    let load = game.load();

    if(load) {
      this.setState({currentGame: load},function() {
        this.setState({nextView: 1});
      });
    } else {
      console.log("msg test");
      this.setState({notificationMsg: "No savegame was found"});
    }
  }

  overviewHandler() {
    this.setState({nextView: 1});
  }

  nextViewHandler() {
    if(this.state.currentGame.winner === null && !this.state.currentGame.saveGame){
      this.state.currentGame.updateActivePlayer();
      game.save(this.state.currentGame);
      this.setState({nextView: 2});
    } else if(this.state.currentGame.winner === null && this.state.currentGame.saveGame){
      this.setState({nextView: 2});
      this.state.currentGame.saveGame = false;
    } else {
      this.setState({nextView: 3});
    }
  }
/*====================================================*/
/*                  General Functions                 */
/*====================================================*/
  _loadActivePlayer() {
    let activePlayer = this.state.currentGame.activePlayer;
    return this.state.currentGame.playerList.find(function(player){
      return player.tablePosition === activePlayer;
    })
  }
}


module.exports = App;
