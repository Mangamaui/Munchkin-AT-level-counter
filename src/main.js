let React =  require('react');
let ReactDOM = require('react-dom');
let AvatarSelector = require('./components/AvatarSelector');
let LevelCounter = require('./components/LevelCounter');
let PlayerBadge = require('./components/PlayerBadge');



// ReactDOM.render(
//   <AvatarSelector />,
//   document.getElementById('app')
// )

// ReactDOM.render(
//   <LevelCounter levelType="characterLevel"/>,
//   document.getElementById('app')
// )

ReactDOM.render (
    <PlayerBadge />,
    document.getElementById('app')
)
