import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Waiting from './waiting';

const WaitingForTeam = () => (
  <Row className="waitingForTeamTitle" style={{ alignContent: 'center' }}>
    <h3>Please Wait for Your Team to Assemble</h3>
    <Col md={2} xs={0} />
    <Col md={8} xs={12} className="waiting">
      <Waiting />
    </Col>
    <Col md={2} xs={0} />
  </Row>
);

export default WaitingForTeam;
