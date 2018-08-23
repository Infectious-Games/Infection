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
    this.setNumOfPlayers = this.setNumOfPlayers.bind(this);

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

  handleSubmit(e) {
    e.preventDefault();
    const game = {"game": this.state.game};
    axios.post('/game', game)
      .then((response) => {
        response.data ? console.log(`game: ${game.game} added to db`) : console.log(`game: ${game.game} aleady in db`);
        socket.emit('join game', {game: this.state.game})
        this.props.setInGameStatus();
      })
      .catch((error) => {
        console.error(error, 'error in index.jsx');
      });
  }

  handleChange(e) {
    this.setState({ game: e.target.value });
    console.log(this.state.game)
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