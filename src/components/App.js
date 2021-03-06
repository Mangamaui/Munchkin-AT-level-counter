let React =  require('react');
// non-components
let game = require('../lib/game');
let checkIfSaveGameExists = require('../lib/game').checkIfSaveGameExists;
let player = require('../lib/player');
let avatars = require('../lib/avatars');
let getAvatar = require('../lib/avatars').getAvatar;
// Components
let AvatarSelector = require('./AvatarSelector');
let PlayerBadge = require('./PlayerBadge');
let CurrentPlayerModal = require('./CurrentPlayerModal');
let CustomButton = require('./CustomButton');


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedAvatarID: null,
      currentGame: null,
      disabled_add_btn: false,
      disabled_start_btn: true,
      disabled_load_btn: true,
      nextView: null,
      notificationMsg: null,
      playerName: null,
      splash: false,
      tablePosition: 0
    }
  }
  componentDidMount() {
    console.log(checkIfSaveGameExists());
    this.setState({disabled_load_btn: checkIfSaveGameExists()});
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
        return this.splashScreen;
      } else {
        return this.startView;
      }

    } else {

      let viewToShow = null;

      switch (this.state.nextView) {
        case 1:
          viewToShow = this.playerOverview;
          break;

        case 2:
          viewToShow = this.activePlayerView;
          break;

        case 3:
          viewToShow = this.winnerView;
          break;

        case 4:
          viewToShow = this.startView;
          break;

        default:
          viewToShow = this.newGameView;
      }

      return viewToShow;
    }
  }
/*====================================================*/
/*                   View Templates                   */
/*====================================================*/
  splashScreen() {
    return (
      <div className="l-splash_view">
       <div className="logo">
       </div>
       <h1><span className="brand-name">Munchkin</span> level counter</h1>
      </div>
    )
  }

  startView() {
    return (
      <div className="l-welcome_view" >
        <div className="content_wrap">
          <img className="stone_slab mobile_slab" src="assets/images/stone_slab_300.svg" />
          <img className="stone_slab desktop_slab" src="assets/images/stone_slab_900.svg" />
          <div className="text_wrap">
            <p>Welcome to <br className="desktop_only"/> the Munchkin Adventure Time Level Counter!
            <br /> Start tracking your game by clicking "new game".</p>
          </div>
        </div>
        <div className="button_wrap">
          <CustomButton button_class="start-btn button_primary" button_handler={this.newGameHandler.bind(this)} button_text="start new game">
          </CustomButton>
          <CustomButton button_class="load-btn button_primary" button_handler={this.loadGameHandler.bind(this)} disabled={this.state.disabled_load_btn} button_text="load saved game">
          </CustomButton>
        </div>
      </div>
    )
  }

  newGameView() {
    return (
      <div>
        <div className="l-new_game_view">
          <div className="content_wrap">
            <img className="stone_slab mobile_slab" src="assets/images/stone_slab_300.svg" />
            <img className="stone_slab desktop_slab" src="assets/images/stone_slab_740x550.svg" />

            <p className="info_text">Start by adding a minimum of 3 players and a maximum of 6 players to your game</p>
            <div className="player_creator">
              <form onSubmit={this.addPlayerHandler.bind(this)}>
              <AvatarSelector />
              <input className="player_creator__input" type="text" id="playerName" placeholder="player name" onChange={this.changeHandler.bind(this)}/>
              </form>
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

  playerOverview() {
    let list = this.state.currentGame.playerList.map(function(player){
        return <PlayerBadge key={player.id} currentPlayer={player} />;
    });

    return (
      <div className="l-player_overview">
        <div className="list_wrap">
          {list}
        </div>
        <div className="button_wrap">
          <CustomButton button_class="button_primary" button_handler={this.nextViewHandler.bind(this)} button_text="start playing!">
          </CustomButton>
        </div>
      </div>
    )
  }

  activePlayerView() {
    const ACTIVE_PLAYER = this.loadActivePlayer();

    return (
      <div className="l-active_player_view">
        <CurrentPlayerModal currentPlayer={ACTIVE_PLAYER} currentGame={this.state.currentGame} />
        <div className="button_wrap">
          <CustomButton button_class="nextTurn-btn button_primary" button_handler={this.nextViewHandler.bind(this)} button_text="end turn">
          </CustomButton>
        </div>
      </div>
    )
  }

  winnerView() {
    const ACTIVE_PLAYER = this.loadActivePlayer();
    return (
      <div className="l-winner_view">
        <div className="winner_block content_wrap">
          <img className="stone_slab mobile_slab" src="assets/images/stone_slab_300.svg" />
          <img className="stone_slab desktop_slab" src="assets/images/stone_slab_740x550.svg" />
          <p className="winner_block__winner">{ACTIVE_PLAYER.name} wins this game!</p>
          <img className="winner_block__avatar" src={getAvatar(ACTIVE_PLAYER.avatar)}/>

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
    }.bind(this), 1200);
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
    const LOAD = game.load();

    if(LOAD) {
      this.setState({currentGame: LOAD},function() {
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
    const ACTIVE_PLAYER = this.state.currentGame.activePlayer;
    return this.state.currentGame.playerList.find(function(player){
      return player.tablePosition === ACTIVE_PLAYER;
    });
  }

  changeHandler(e) {
    this.setState(
      { [e.target.id]: e.target.value }
    );
  }

  addPlayerHandler(e) {
    const GAME = this.state.currentGame;
    const LIMIT = GAME.addPlayerToGame({
      name: this.state.playerName,
      avatar: avatars.selectedAvatarID,
      tablePosition: (this.state.tablePosition+=1)
    });

    avatars.updateAvailableAvatars(avatars.selectedAvatarID);

    this.setState({disabled_add_btn: LIMIT});

    this.clearInput();
    this.checkPlayerMinimum();
    this.forceUpdate();
    e.preventDefault();
  }

  clearInput() {
    let input = document.getElementById('playerName');
    input.value = "";
    this.setState({playerName: null});
  }

  checkPlayerMinimum() {
    if(this.state.currentGame.playerList.length > 2){
      this.setState({disabled_start_btn: false});
      this.forceUpdate();
    }
  }
}



module.exports = App;
