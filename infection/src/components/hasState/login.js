import React from 'react';
import io from 'socket.io-client';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap'; 

const socket = io();

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      game: 'demo'
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.username);
    socket.emit('join game', { username: this.state.username, game: this.state.game});
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
    //console.log(this.state.username);
    
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
            onChange={this.handleChange} 
            onSubmit={this.handleSubmit}
          />
        </FormGroup>{' '}
          <Button type="submit">Enter Game</Button>
      </Form>
    );
  }
}


export default Login;
