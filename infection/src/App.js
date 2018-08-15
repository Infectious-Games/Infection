import React from 'react';
import './App.css';
import Welcome from './views/noProps/welcome';


const App = (props) => 
  props.game ?
    <div className="App">Game View</div>
    : <div className="App">
        <Welcome></Welcome>
      </div>
  
export default App;
