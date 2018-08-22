import React from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';

const JoinGame = () => ({ login, handleSubmit, handleChange }) => {
  console.log(login, handleSubmit, handleChange);

  return <Form className="login" inline>
    <FormGroup controlId="formInlineName">
      <ControlLabel></ControlLabel>{' '}
      <FormControl
        type="text"
        placeholder="Your Handle"
        value={login.username}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
    </FormGroup>{' '}
    <Button
      type="submit"
      bsStyle="danger"
      onClick={handleSubmit}
    >Enter Game</Button>
  </Form>
}

export default JoinGame;