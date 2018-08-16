import React from 'react';
import io from 'socket.io-client';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap'; 
import Game from '../../views/withProps/game';

const socket = io();

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    this.state = {
      username: '',
      game: 'demo',
      loggedIn: false,

    };
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.username, 'handleSubmit username');  
    socket.emit('join game', { username: this.state.username, game: this.state.game});  
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
    console.log(this.state.username, 'handleChange username');
  }

  render() {
    return (
      <div>{
        this.state.loggedIn 
        ? <Game></Game>
        : <Form inline>
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
      }</div>
    );
  }
}

export default Login;
