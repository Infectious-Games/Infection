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
    // axios.get('/loggedIn', {}).then(({ data }) => {
    //   const loggedIn = data.loggedIn;
    //   if (loggedIn) {
    //     const {
    //       clearanceLevel,
    //       gamesPlayed,
    //       losses,
    //       photo,
    //       username,
    //       wins,
    //     } = data.user;
    //     this.setState({
    //       loggedIn,
    //       username,
    //       clearanceLevel,
    //       gamesPlayed,
    //       losses,
    //       wins,
    //       photo,
    //     });
    //   }
    // });
  }

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

  setNumOfPlayers(num) {
    this.setState({ numOfPlayers: num });
    this.handleCreateGame(num);
  }

  handleCreateGame(playerCount) {
    const { pal3000Active } = this.state;
    // check to see if PAL3000 has been selected
    const gameParams = {
      playerCount,
      // pal3000Active: this.state.pal3000Active,
      pal3000Active,
    };
    axios
      .post('/start', gameParams)
      .then(joinCode => {
        this.setState({ newGameCode: joinCode.data });
      })
      .catch(error => {
        console.error(error, 'error creating game in login.js');
      });
  }

  handleChange(e) {
    this.setState({ game: e.target.value });
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

  activatePal() {
    this.setState({ pal3000Active: !this.state.pal3000Active });
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
          <Welcome setLoggedIn={this.setLoggedIn.bind(this)} />
        )}
      </Grid>
    );
  }
}

export default Login;
