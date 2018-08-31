import React from 'react';
import { Image, Col, Row } from 'react-bootstrap';

import scientist from '../../../images/scientist1.png';

const Scientist = () => (
  <Row className="scientist" fluid-container>
    <br />
    <h4>YOU'VE BEEN ADDED TO THE TASK FORCE</h4>
    <Col md={4} xs={2} fluid-container />
    <Col md={4} xs={8} fluid-container>
      <Image src={scientist} responsive class="img-responsive center-block" />
      <h2 className="scientist-title">SCIENTIST</h2>
      <h4>YOUR OBJECTIVES:</h4>
      <ul>
        <li>Administer Cure</li>
        <li>Contain Outbreaks</li>
        <li>Uncover Infiltrators</li>
      </ul>
    </Col>
    <Col md={4} xs={2} fluid-container />
  </Row>
);

export default Scientist;
