import React from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup, Grid, Row } from 'react-bootstrap';

const JoinGame = ({ game, handleSubmit, handleChange }) => 
<Grid>
<Row>
  JOIN A MISSION
</Row>
  <Row>
    <Form className="login" inline>
      <FormGroup controlId="formInlineName">
        <ControlLabel></ControlLabel>{' '}
        <FormControl
          type="text"
          placeholder="Enter Game Code"
          value={game}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      </FormGroup>{' '}
      <Button
        type="submit"
        bsStyle="success"
        onClick={handleSubmit}
      >
        Enter Game
      </Button>
  </Form>
</Row>
</Grid>


export default JoinGame;