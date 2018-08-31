import React from 'react';
import {
  Button,
  Col,
  Form,
  ControlLabel,
  FormControl,
  FormGroup,
  Row,
} from 'react-bootstrap';

const JoinGame = ({ game, handleSubmit, handleChange }) => (
  <Row>
    <Col xs={3} />
    <Col xs={6}>
      <h4>
        <b>JOIN A GAME</b>
      </h4>
      {/* <ControlLabel>JOIN A GAME</ControlLabel> */}
      <Form className="login" inline>
        <FormGroup controlId="formInlineName">
          <FormControl
            type="text"
            placeholder="Enter Game Code"
            // bsSize="large"
            value={game}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
          <Button
            type="submit"
            bsStyle="success"
            onClick={handleSubmit}
            bsSize="small"
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
