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
    const { inGame } = this.state;
    this.setState({ inGame: !inGame });
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
    const { inGame } = this.state;
    return (
      <Grid className="App">
        {inGame ? (
          <Game
            setInGameStatus={this.setInGameStatus}
            setLoggedIn={this.setLoggedIn}
          />
        ) : (
          <Login
            setInGameStatus={this.setInGameStatus}
            setLoggedIn={this.setLoggedIn}
            user={user}
          />
        )}
      </Grid>
    );
  }
}

export default App;
