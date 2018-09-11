import React from 'react';
import { Image, Col, Row } from 'react-bootstrap';

import scientist from '../../../images/scientist1.png';

const Scientist = () => (
  <Row className="scientist">
    <br />
    <h4>YOU HAVE BEEN ADDED TO THE TASK FORCE</h4>
    <Col md={4} xs={2} />
    <Col md={4} xs={8}>
      <Image src={scientist} width={125} height={150} />
      <h2 className="scientist-title">SCIENTIST</h2>
      <h4>YOUR OBJECTIVES:</h4>
      <div alignContent="middle">
        <p>• Administer Cure</p>
        <p>• Contain Outbreaks</p>
        <p>• Uncover Infiltrators</p>
      </div>
    </Col>
    <Col md={4} xs={2} />
  </Row>
);

export default Scientist;
