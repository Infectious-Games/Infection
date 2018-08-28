import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Waiting from './waiting';

const WaitingForRosterVote = () => 
  <Row>
    <h3>Your Vote Has Been Recorded!</h3>
    <h4>Please Wait For The Rest Of Your Team To Vote.</h4>
    <Col md={2}></Col>
    <Col md={8}>
      <br></br>
      <Waiting></Waiting>
    </Col>
    <Col md={2}></Col>
  </Row>


export default WaitingForRosterVote;