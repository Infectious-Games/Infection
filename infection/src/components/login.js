import React from 'react';
import socket from '../socket';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap'; 
const axios = require('axios');

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
        this.props.login();
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
      <Form 
      
        inline>
        <FormGroup controlId="formInlineName">
          <ControlLabel>Name</ControlLabel>{' '}
          <FormControl 
            type="text" 
            placeholder="Your Name"
            value={this.state.username}
            onSubmit={this.handleSubmit.bind(this)}
            onChange={this.handleChange.bind(this)} 
          />
        </FormGroup>{' '}
        <Button type="submit" onClick={this.handleSubmit.bind(this)}>Enter Game</Button>
      </Form>
    );
  }
}

export default Login;