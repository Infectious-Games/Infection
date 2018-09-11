import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Waiting from './waiting';

const WaitingForRosterVote = () => (
  <Row>
    <h3>Your Vote Has Been Recorded</h3>
    <h4>Please Wait For The Rest Of Your Team To Vote.</h4>
    <Col md={2} />
    <Col md={8} xs={12} className="waiting">
      <br />
      <Waiting />
    </Col>
    <Col md={2} />
  </Row>
);

export default WaitingForRosterVote;
