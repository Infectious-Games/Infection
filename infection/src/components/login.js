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
    this.handleCreateGame = this.handleCreateGame.bind(this);

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
  componentDidMount() {
    // GET TO SERVER /loggedIn
    axios.get('/loggedIn', {
      // params: { username },
    }).then((response) => {
      console.log(response, 'response from GET /loggedIn in login');
      // this.setState({ loggedIn: true });
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setInGameStatus();
    socket.emit('join game', { username: this.state.username, game: this.state.game })
  }

  handleChange(e) {
    this.setState({ game: e.target.value });
    console.log(this.state.game, 'game in handleChange')
  }

  handleCreateGame(num) {
    const playerCount = {"playerCount": num};
    console.log(num, 'num sent to server in handleCreateGame');
    axios.post('/start', playerCount)
      .then((joinCode) => {
        console.log(joinCode.data, 'joinCode in handleCreateGame');
        this.setState({ newGameCode: joinCode.data });
      })
      .catch((error) => {
        console.error(error, 'error creating game in login.js');
      });
  }

  setNumOfPlayers(num) {
    console.log(num, 'num taken as input in setNumOfPlayers');
    this.setState({ numOfPlayers: num })
    this.handleCreateGame(num);
  }

  getUserStats = () => {
    const username = this.state.username;
    axios.get('/userStats', {
      params: { username },
    }).then((response) => {
      console.log(response, 'response from getUserStats in login');
    })
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
              handleCreateGame={this.handleCreateGame.bind(this)}
            ></Dashboard>
          : <Welcome></Welcome>
        }
      </Grid>
    );
  }
}

export default Login;