import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

import './App.css';
import Login from './components/login';
import Game from './components/game';

class App extends Component {
  constructor(props) {
    super(props);
    this.setInGameStatus = this.setInGameStatus.bind(this);
    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.state = {
      inGame: false,
      loggedIn: false,
      username: undefined,
      clearanceLevel: 'unclassified',
      gamesPlayed: 0,
      losses: 0,
      wins: 0,
      photo: undefined,
    };
  }

  // pass a function to setInGameStatus to set state.
  setInGameStatus() {
    this.setState({ inGame: !this.state.inGame });
  }

  // pass to Game and Login
  setLoggedIn(profile) {
    const {
      clearanceLevel,
      gamesPlayed,
      losses,
      photo,
      username,
      wins,
    } = profile;
    this.setState({
      loggedIn: true,
      username,
      clearanceLevel,
      gamesPlayed,
      losses,
      wins,
      photo,
    });
  }

  render() {
    const user = this.state;
    return (
      <Grid className="App">
        {this.state.inGame ? (
          <Game
            setInGameStatus={this.setInGameStatus.bind(this)}
            setLoggedIn={this.setLoggedIn.bind(this)}
          />
        ) : (
          <Login
            setInGameStatus={this.setInGameStatus.bind(this)}
            setLoggedIn={this.setLoggedIn.bind(this)}
            user={user}
          />
        )}
      </Grid>
    );
  }
}

export default App;
