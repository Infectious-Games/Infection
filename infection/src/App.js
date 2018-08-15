import React, { Component } from 'react';
import './App.css';
import Welcome from './views/welcome';

// // socket in client setup
// import io from 'socket.io-client';
// // add to constructor of form input component 
// const socket = io();
// socket.emit('join game', this.props)


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
