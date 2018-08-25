import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';

import Waiting from './waiting';

const WaitingForRosterVote = () => 
  <Grid>
    <Row>
      <Col md={8}>
        <h3>YOUR VOTE HAS BEEN RECORDED!</h3>
        <h4>Please wait for the rest of your Team to Vote.</h4>
        <br></br>
        <Waiting></Waiting>
      </Col>
    </Row>
  </Grid>

export default WaitingForRosterVote;