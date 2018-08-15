import React from 'react';
import './App.css';
import Welcome from './views/noProps/welcome';
import Game from './views/withProps/game'

const App = (props) => 
  props.user ?
    <div className="App"><Game game={props} ></Game></div>
    : <div className="App">
        <Welcome></Welcome>
      </div>
  
export default App;
