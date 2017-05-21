let React =  require('react');
// non-components
let game = require('../lib/game');
let player = require('../lib/player');
let avatars = require('../lib/avatars');
let getAvatar = require('../lib/avatars').GetAvatar;
// Components
let AvatarSelector = require('./AvatarSelector');
let PlayerBadge = require('./PlayerBadge');
let CurrentPlayerModal = require('./CurrentPlayerModal');
let CustomButton = require('./button');


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedAvatarID: null,
      currentGame: null,
      disabled_add_btn: false,
      disabled_start_btn: true,
      nextView: null,
      notificationMsg: null,
      playerName: null,
      splash: false,
      tablePosition: 0
    }
  }

  render() {
    return(
      <div className="App">
      {this.loadViews().call(this)}
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
  loadViews() {
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
      <div className="welcome_view" >
        <div className="content_wrap">
          <img className="stone_slab" src="assets/images/stone_slab_300.svg" />
          <p>Welcome to the Munchkin Adventure Time Level Counter!</p>
          <br />
          <p>Start tracking your game by clicking "new game".</p>
        </div>
        <div className="button_wrap">
          <CustomButton button_class="start-btn button_primary" button_handler={this.newGameHandler.bind(this)} button_text="start new game">
          </CustomButton>
          <CustomButton button_class="load-btn button_primary" button_handler={this.loadGameHandler.bind(this)} button_text="load saved game">
          </CustomButton>
        </div>
      </div>
    )
  }

  _newGameView() {
    return (
      <div>
        <div className="new_game_view">
          <div className="content_wrap">
            <img className="stone_slab" src="assets/images/stone_slab_300.svg" />
            <p className="info_text">Start by adding a minimum of 3 players and a maximum of 6 players to your game</p>
            <div className="player_creator">
              <AvatarSelector />
              <input className="player_creator__input" type="text" id="playerName" placeholder="player name" onChange={this.changeHandler.bind(this)}/>
            </div>
            <p className="player_count">Players added to the game: <span>{this.state.currentGame.playerList.length}</span></p>
          </div>
          <div className="button_wrap">
            <CustomButton button_class="add-player-btn button_secundary" button_handler={this.addPlayerHandler.bind(this)} button_text="add player" disabled={this.state.disabled_add_btn}>
            </CustomButton>
            <CustomButton button_class="start-btn button_primary" button_handler={this.overviewHandler.bind(this)} button_text="continue" disabled={this.state.disabled_start_btn}>
            </CustomButton>
          </div>
        </div>
      </div>
    )
  }

  _playerOverview() {
    let list = this.state.currentGame.playerList.map(function(player){
        return <PlayerBadge key={player.id} currentPlayer={player} />;
    });

    return (
      <div className="player_overview">
        {list}

        <div className="button_wrap">
          <CustomButton button_class="button_primary" button_handler={this.nextViewHandler.bind(this)} button_text="start playing!">
          </CustomButton>
        </div>
      </div>
    )
  }

  _activePlayerView() {
    let playerLoad = this.loadActivePlayer();

    return (
      <div className="activer_player_view">
        <CurrentPlayerModal currentPlayer={playerLoad} currentGame={this.state.currentGame} />
        <div className="button_wrap">
          <CustomButton button_class="nextTurn-btn button_primary" button_handler={this.nextViewHandler.bind(this)} button_text="end turn">
          </CustomButton>
        </div>
      </div>
    )
  }

  _winnerView() {
    let playerLoad = this.loadActivePlayer();
    return (
      <div className="winner_view">
        <div className="winner_block content_wrap">
          <img className="stone_slab" src="assets/images/stone_slab_300.svg" />
          <p className="winner_block__winner">{playerLoad.name} wins this game!</p>
          <img className="winner_block__avatar" src={getAvatar(playerLoad.avatar)}/>

          <p className="winner_block__text">Time for another round?</p>
        </div>
        <div className="button_wrap">
          <CustomButton button_class="newGame-btn button_primary" button_handler={this.restartGameHandler.bind(this)} button_text="start new game"></CustomButton>
        </div>
      </div>
    )
  }

/*====================================================*/
/*                    Event Handlers                  */
/*====================================================*/

  loadStartHandler() {
    setTimeout(function(){
      this.setState({splash: true});
    }.bind(this), 500);
  }

  newGameHandler() {
    this.setState({currentGame: game.create()});
  }

  restartGameHandler() {
    game.removeSaveGame();
    avatars.resetStates();
    this.setState({
      selectedAvatarID: null,
      currentGame: game.create(),
      disabled_add_btn: false,
      disabled_start_btn: true,
      nextView: null,
      notificationMsg: null,
      playerName: null,
      tablePosition: 0
    });
  }

  loadGameHandler() {
    let load = game.load();

    if(load) {
      this.setState({currentGame: load},function() {
        this.setState({nextView: 1});
      });
    } else {
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
  loadActivePlayer() {
    let activePlayer = this.state.currentGame.activePlayer;
    return this.state.currentGame.playerList.find(function(player){
      return player.tablePosition === activePlayer;
    });
  }

  changeHandler(e) {
    this.setState(
      { [e.target.id]: e.target.value }
    );
  }

  addPlayerHandler(e) {
    let game = this.state.currentGame;
    let limit = game.addPlayerToGame({
      name: this.state.playerName,
      avatar: avatars.selectedAvatarID,
      tablePosition: (this.state.tablePosition+=1)
    });

    avatars.UpdateAvailableAvatars(avatars.selectedAvatarID);

    if (limit) {
      this.setState({disabled_add_btn: true});
    }

    this.clearInput();
    this.checkPlayerMinimum();
    this.forceUpdate();
  }

  clearInput() {
    let input = document.getElementById('playerName');
    input.value = "";
  }

  checkPlayerMinimum() {
    if(this.state.currentGame.playerList.length > 2){
      this.setState({disabled_start_btn: false});
      this.forceUpdate();
    }
  }
}



module.exports = App;
