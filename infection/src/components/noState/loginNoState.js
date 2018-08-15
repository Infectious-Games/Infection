import React from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap'; 

function onChange() { console.log(onChange.list) }

let _dispatch = () => {};

const myHandler = (e) => _dispatch(something());

const Login = (props) => {
    if (!_dispatch)
        _dispatch = props.dispatch;

  return (
  <Form inline>
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
    <Button
      onClick={myHandler} 
      type="submit">Enter Game</Button>
  </Form>
        // <button onClick={myHandler}>Click Me</button>
    );
}