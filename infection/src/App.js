import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

import './App.css';
import Login from './components/login';
import Game from './components/game';

class App extends Component {
  constructor(props) {
    super(props);
    this.setInGameStatus = this.setInGameStatus.bind(this);
    this.state = {
      inGame: false,
    };
  }

  // pass a function to setInGameStatus to set state.
  setInGameStatus() {
    this.setState({ inGame: !this.state.inGame });
    // this should be handled in the store
  }

  render() {
    return (
      <Grid className="App">
        {this.state.inGame ? (
          <Game setInGameStatus={this.setInGameStatus.bind(this)} />
        ) : (
          <Login setInGameStatus={this.setInGameStatus.bind(this)} />
        )}
      </Grid>
    );
  }
}

export default App;
