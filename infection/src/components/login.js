import React from 'react';
import socket from '../socket';
import axios from 'axios';

import Welcome from '../views/login/welcome';


class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    this.state = {
      username: '',
      game: 'demo'
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
    return (
      <Welcome
        login={this.state}
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
      ></Welcome>
    );
  }
}

export default Login;