import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

import Waiting from './waiting';

const WaitingForRosterVote = () => 
  <Grid>
    <Row>
      <Col md={8}>
        <h3>Your Vote Has Been Recorded!</h3>
        <h4>Please Wait For The Rest Of Your Team To Vote.</h4>
        <br></br>
        <Waiting></Waiting>
      </Col>
    </Row>
  </Grid>

export default WaitingForRosterVote;