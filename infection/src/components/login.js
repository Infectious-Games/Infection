import React from 'react';
import socket from '../socket';
import axios from 'axios';
import { Grid } from 'react-bootstrap';
import Welcome from '../views/login/welcome';
import Dashboard from '../views/login/dashboard';


class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //create new game event handlers
    this.handleCreateGame = this.handleCreateGame.bind(this);
    this.handlePlayerCountChange = this.handlePlayerCountChange.bind(this);
    //join game event handlers
    this.handleJoinGame = this.handleJoinGame.bind(this);
    this.handleJoinCodeChange = this.handleJoinCodeChange.bind(this);

    this.state = {
      clearance: 'Unclassified',
      game: '',
      playerCount: '',
      handle: 'test',
      loggedIn: true,
      losses: 0,
      username: 'bob',
      wins: 0,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {"username": this.state.username};
    axios.post('/user', user)
      .then((response) => {
        response.data ? console.log(`user: ${user.username} added to db`) : console.log(`user: ${user.username} aleady in db`);
        this.props.setInGameStatus();
      })
      .catch((error) => {
        console.error(error, 'error in index.jsx');
      });
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
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

  handleJoinGame(e) {
    e.preventDefault();
    // send username and game name to server TODO: test that this is working
    socket.emit('join game', { username: this.state.username, game: this.state.game})
  }

  handleJoinCodeChange(e) {
    //TODO: test if working
    this.setState({ game: e.target.value });
  }

  render() {
    const user = this.state;
    return (
      <Grid>
        {
          user.loggedIn
          ? <Dashboard
              clearance={user.clearance}
              handle={user.handle}
              losses={user.losses}
              username={user.username}
              wins={user.wins}
            ></Dashboard>
          : <Welcome
          login={user}
          handleChange={this.handleChange.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
        ></Welcome>
        }
      </Grid>
    );
  }
}

export default Login;