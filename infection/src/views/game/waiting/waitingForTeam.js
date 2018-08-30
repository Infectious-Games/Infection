import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Waiting from './waiting';

const WaitingForTeam = () => (
  <Row className="waitingForTeamTitle">
    <h3>Please Wait for Team to Assemble</h3>
    <Col md={2} />
    <Col md={8}>
      <Waiting />
    </Col>
    <Col md={2} />
  </Row>
);

export default WaitingForTeam;
