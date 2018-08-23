import React from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup, Grid, Row, Col } from 'react-bootstrap';

const JoinGame = ({ game, handleSubmit, handleChange }) =>
  <Grid>
    <Row>
      <Col md={5}>
        <h4>
          JOIN A GAME
        </h4>
      </Col>
    </Row>
    <Row>
      <Col md={5}>
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
      </Col>
    </Row>
  </Grid>


export default JoinGame;