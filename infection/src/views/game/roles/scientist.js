import React from 'react';
import { Image, Col, Row } from 'react-bootstrap';

import scientist from '../../../images/Scientist.png';

const Scientist = () => (
  <Row className="scientist">
    <br />
    <h4>YOU'VE BEEN ADDED TO THE TASK FORCE!</h4>
    <Col md={4} xs={2} />
    <Col md={4} xs={8}>
      <Image src={scientist} responsive />
      <h2 className="scientist-title">SCIENTIST</h2>
      <h4>YOUR OBJECTIVES:</h4>
      <ul>
        <li>Administer Cure</li>
        <li>Contain Outbreaks</li>
        <li>Uncover Infiltrators</li>
      </ul>
    </Col>
    <Col md={4} xs={2} />
  </Row>
);

export default Scientist;
