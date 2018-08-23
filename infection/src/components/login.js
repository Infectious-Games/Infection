import React from 'react';
import socket from '../socket';
import axios from 'axios';
import { Grid } from 'react-bootstrap';
import Welcome from '../views/login/welcome';
import Dashboard from '../views/login/dashboard';


class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.setInGameStatus = props.setInGameStatus;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setNumOfPlayers = this.setNumOfPlayers.bind(this);

    this.state = {

    this.state = {
      clearance: 'unclassified',
      game: undefined,
      loggedIn: false,
      losses: 0,
      newGameCode: undefined,
      username: undefined,
      wins: 0,
      numOfPlayers: 4,

    };
  }

  //sends join code to server and triggers join game event
  handleSubmit(e) {
    e.preventDefault();
    this.setInGameStatus();
    socket.emit('join game', { username: this.state.username, game: this.state.game })
  }

  handleChange(e) {
    this.setState({ game: e.target.value });
    console.log(this.state.game)
  }
//TODO: plug in functions below to start game form. Needs to be tested
  handleCreateGame(e) {
    e.preventDefault();
    const playerCount = {"playerCount": this.state.playerCount};
    axios.post('/start', playerCount)
      .then((joinCode) => {
        console.log(joinCode);
        //TODO: alert message for join code?
      })
      .catch((error) => {
        console.error(error, 'error creating game in login.js');
      });
  }

  handlePlayerCountChange(e) {
    this.setState({ playerCount: e.target.value });
  }

  setNumOfPlayers(num) {
    console.log(num);
    this.setState({ numOfPlayers: num })
    console.log(this.state.numOfPlayers)
  }

  render() {
    const user = this.state;
    return (
      <Grid>
        {
          user.loggedIn
          ? <Dashboard
              game={user.game}
              newGame={user.newGameCode}
              clearance={user.clearance}
              losses={user.losses}
              username={user.username}
              wins={user.wins}
              handleChange={this.handleChange.bind(this)}
              handleSubmit={this.handleSubmit.bind(this)}
              setNumOfPlayers={this.setNumOfPlayers.bind(this)}
            ></Dashboard>
          : <Welcome></Welcome>
        }
      </Grid>
    );
  }
}

export default Login;