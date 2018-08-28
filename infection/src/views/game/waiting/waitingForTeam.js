import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Waiting from './waiting';


const WaitingForTeam = () => 
  <Row className="waitingForTeamTitle">
    <h1>Please Wait for the Team to Assemble</h1>
    <Col md={2}></Col>
    <Col md={8}>
      <Waiting></Waiting>
    </Col>
    <Col md={2}></Col>
  </Row>
 
export default WaitingForTeam;