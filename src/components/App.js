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
      PlayerCreator: null,
      splash: false
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
    if(this.state.currentGame === null) {
      if(!this.state.splash) {
        this.loadStartHandler();
        return this._splashScreen;
      } else {
        return this._startView;
      }

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

        case 4:
          viewToShow = this._startView;
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
  _splashScreen() {
    return (
      <div>
       <div className="logo">
       </div>
       <h1><span className="brand-name">Munchkin</span> level counter</h1>
      </div>
    )
  }

  _startView() {
    return (
      <div className="content-box">
        <div className="message_slab">
          <p>Welcome to the Munchkin Adventure Time Level Counter!</p>
          <br />
          <p>Start tracking your game by clicking "new game".</p>
        </div>
        <button className="start-btn button button_primary" onClick={this.newGameHandler.bind(this)}>Start New Game</button>
        <button className="load-btn button button_primary" onClick={this.loadGameHandler.bind(this)}>Load Saved Game</button>
      </div>
    )
  }

  _newGameView() {
    const notify = this.notify.bind(this);
    return (
      <div>
        <p>Start by adding a minimum of 3 players and a maximum of 6 players to your game</p>
        <PlayerCreator currentGame={this.state.currentGame} notify={notify} />
        <p>Players added to the game: <br /><span>{this.state.currentGame.playerList.length}</span></p>
        <button className="start-btn button button_primary" onClick={this.overviewHandler.bind(this)} disabled={this.state.disabled}>Start the game</button>
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
        <button className="button button_primary" onClick={this.nextViewHandler.bind(this)}>Start Playing!</button>
      </div>
    )
  }

  _activePlayerView() {
    let playerLoad = this._loadActivePlayer();

    return (
      <div>
        <CurrentPlayerModal currentPlayer={playerLoad} currentGame={this.state.currentGame} />
        <button className="nextTurn-btn button button_primary" onClick={this.nextViewHandler.bind(this)}>End turn</button>
      </div>
    )
  }

  _winnerView() {
    let playerLoad = this._loadActivePlayer();
    return (
      <div>
      <h2>{playerLoad.name} is the winner!!!</h2>
        <PlayerBadge currentPlayer={playerLoad} />
        <button className="newGame-btn button_primary" onClick={this.restartGameHandler.bind(this)}>Start New Game</button>
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

  loadStartHandler() {
    setTimeout(function(){
      this.setState({splash: true});
    }.bind(this), 2000);
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
      //console.log("msg test");
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
