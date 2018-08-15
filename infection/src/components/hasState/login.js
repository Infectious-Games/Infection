import React from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap'; 

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      value: ''
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.value);
    console.log('hi');
    
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    console.log(this.state.value);
    
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
