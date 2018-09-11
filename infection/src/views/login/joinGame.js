import React from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  Row,
} from 'react-bootstrap';

const JoinGame = ({ game, handleSubmit, handleChange }) => (
  <Row>
    <br />
    <Col xs={3} />
    <Col xs={6}>
      <div className="start-game-text">
        <h5>
          <b>JOIN A GAME</b>
        </h5>
      </div>
      {/* <h6 className="lesser">Ask game creator for your code.</h6> */}
      {/* <ControlLabel>JOIN A GAME</ControlLabel> */}
      <Form className="login" inline>
        <FormGroup controlId="formInlineName">
          <FormControl
            type="text"
            placeholder="Enter Code"
            // bsSize="large"
            value={game}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
          <br />
          <Button
            type="submit"
            bsStyle="info"
            onClick={handleSubmit}
            bsSize="small"
            className="enter-button"
          >
            Enter Game
          </Button>
        </FormGroup>
      </Form>
    </Col>
    <Col xs={3} />
  </Row>
);

export default JoinGame;
