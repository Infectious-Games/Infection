import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';

import scientist from '../../../images/scientist1.png';

const ScientistsWin = () => (
  <Row className="scientist-win">
    <br />
    <h1>The World Is Safe!</h1>
    <br />
    <Row>
      <Col md={4} xs={2} />
      <Col md={4} xs={8}>
        <Image src={scientist} responsive />
      </Col>
      <Col md={4} xs={2} />
    </Row>
    <h3>The Scientists Have Prevailed!</h3>
  </Row>
);

export default ScientistsWin;
