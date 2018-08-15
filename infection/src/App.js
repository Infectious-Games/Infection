import React from 'react';
import './App.css';
import Welcome from './views/noProps/welcome';
import Game from './views/withProps/game'

const App = (props) => 
  <div className="App">{
    props.user
      ? <Game game={props} ></Game>
      : <Welcome></Welcome>
    }
  </div>

export default App;
