let React =  require('react');
let ReactDOM = require('react-dom');
let App = require('./components/App');
let AvatarSelector = require('./components/AvatarSelector');
//let LevelCounter = require('./components/LevelCounter');
let CurrentPlayerModal = require('./components/CurrentPlayerModal');



// ReactDOM.render(
//   <AvatarSelector />,
//   document.getElementById('app')
// )

// ReactDOM.render(
//   <LevelCounter levelType="characterLevel"/>,
//   document.getElementById('app')
// )

ReactDOM.render (
    <App />,
    document.getElementById('content')
)
