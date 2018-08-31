import React from 'react';
import axios from 'axios';
import { Grid } from 'react-bootstrap';

import socket from '../socket';
import Welcome from '../views/login/welcome';
import Dashboard from '../views/login/dashboard';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.setInGameStatus = props.setInGameStatus;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setNumOfPlayers = this.setNumOfPlayers.bind(this);
    this.handleCreateGame = this.handleCreateGame.bind(this);
    this.activatePal = this.activatePal.bind(this);

    this.state = {
      clearanceLevel: 'unclassified',
      game: '',
      gamesPlayed: 0,
      loggedIn: false,
      losses: 0,
      newGameCode: undefined,
      numOfPlayers: 4,
      pal3000Active: false,
      photo: undefined,
      username: undefined,
      wins: 0,
    };
  }
  componentDidMount() {
    // check if user is logged in
    axios.get('/loggedIn', {}).then(({ data }) => {
      const loggedIn = data.loggedIn;
      if (loggedIn) {
        const {
          clearanceLevel,
          gamesPlayed,
          losses,
          photo,
          username,
          wins,
        } = data.user;
        this.setState({
          loggedIn,
          username,
          clearanceLevel,
          gamesPlayed,
          losses,
          wins,
          photo,
        });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setInGameStatus();
    socket.emit('join game', {
      username: this.state.username,
      game: this.state.game,
      pal3000Active: this.state.pal3000Active,
    });
  }

  handleChange(e) {
    this.setState({ game: e.target.value });
  }

  handleCreateGame(num) {
    // check to see if PAL3000 has been selected
    this.state.pal3000Active
      ? console.log('PAL3000 needs to be added to this game')
      : console.log('PAL3000 not selected for this game');
    const playerCount = { playerCount: num };
    axios
      .post('/start', playerCount)
      .then(joinCode => {
        console.log(joinCode.data, 'joinCode in handleCreateGame');
        this.setState({ newGameCode: joinCode.data });
      })
      .catch(error => {
        console.error(error, 'error creating game in login.js');
      });
  }

  setNumOfPlayers(num) {
    this.setState({ numOfPlayers: num });
    this.handleCreateGame(num);
  }

  activatePal() {
    console.log('activate Pal3000');
    this.setState({ pal3000Active: true });
  }

  render() {
    const user = this.state;
    return (
      <Grid className="login">
        {user.loggedIn ? (
          <Dashboard
            game={user.game}
            gamesPlayed={user.gamesPlayed}
            newGame={user.newGameCode}
            clearance={user.clearanceLevel}
            losses={user.losses}
            username={user.username}
            wins={user.wins}
            photo={user.photo}
            handleChange={this.handleChange.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
            setNumOfPlayers={this.setNumOfPlayers.bind(this)}
            handleCreateGame={this.handleCreateGame.bind(this)}
            activatePal={this.activatePal.bind(this)}
          />
        ) : (
          <Welcome />
        )}
      </Grid>
    );
  }
}

export default Login;
