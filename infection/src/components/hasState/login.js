import React from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap'; 

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.value, 'handleSubmit value');    
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    console.log(this.state.value, 'handleChange value');
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
            value={this.state.value}
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
