import React, { Component } from 'react';
import './App.css';
import Welcome from './views/noProps/welcome';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Welcome></Welcome>
      </div>
    );
  }
}

export default App;
