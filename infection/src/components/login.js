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
    this.setLoggedIn = props.setLoggedIn;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setNumOfPlayers = this.setNumOfPlayers.bind(this);
    this.handleCreateGame = this.handleCreateGame.bind(this);
    this.activatePal = this.activatePal.bind(this);

    this.state = {
      game: '',
      newGameCode: undefined,
      numOfPlayers: 4,
      pal3000Active: false,
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

  setNumOfPlayers(numOfPlayers) {
    this.setState({ numOfPlayers });
    this.handleCreateGame(numOfPlayers);
  }

  handleCreateGame(playerCount) {
    const { pal3000Active } = this.state;
    // check to see if PAL3000 has been selected
    const gameParams = {
      playerCount,
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
    const { game, pal3000Active } = this.state;
    const { user } = this.props;
    const { username } = user;
    socket.emit('join game', {
      username,
      game,
      pal3000Active,
    });
  }

  activatePal() {
    const { pal3000Active } = this.state;
    this.setState({ pal3000Active: !pal3000Active });
  }

  render() {
    const { user } = this.props;
    const { game, newGameCode } = this.state;
    return (
      <Grid className="login">
        {user.loggedIn ? (
          <Dashboard
            game={game}
            newGame={newGameCode}
            username={user.username}
            gamesPlayed={user.gamesPlayed}
            clearance={user.clearanceLevel}
            losses={user.losses}
            wins={user.wins}
            photo={user.photo}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            setNumOfPlayers={this.setNumOfPlayers}
            handleCreateGame={this.handleCreateGame}
            activatePal={this.activatePal}
          />
        ) : (
          <Welcome setLoggedIn={this.setLoggedIn} />
        )}
      </Grid>
    );
  }
}

export default Login;
