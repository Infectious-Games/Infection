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
    
    this.state = {

      clearance: 'top-secret',
      game: 'demo',
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
        socket.emit('join game', { username: this.state.username, game: this.state.game})
        this.props.setInGameStatus();
      })
      .catch((error) => {
        console.error(error, 'error in index.jsx');
      });
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
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