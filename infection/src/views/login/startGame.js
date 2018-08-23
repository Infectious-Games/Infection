import React from 'react';
import { Button, ControlLabel, Form, FormControl, FormGroup, Grid, Row, Col } from 'react-bootstrap';

const StartGame = ({ game, handleSubmit, handleChange }) =>
  <Grid>
    <Row>
      <Col md={5}>
        <h4>START A GAME</h4>
      </Col>
    </Row>
    <Row>
      <Col md={5}>
      number of players buttn group
      </Col>
    </Row>
  </Grid>

export default StartGame;