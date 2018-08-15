import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import infectionLogo from './Infection.jpg';
import './App.css';

// // socket in client setup
// import io from 'socket.io-client';
// // add to constructor of form input component 
// const socket = io();
// socket.emit('join game', this.props)


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={infectionLogo} className="App-infection-logo" alt="logo" />
          <h1 className="App-title">INFECTION</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
