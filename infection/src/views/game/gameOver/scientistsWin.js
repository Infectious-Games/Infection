import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';

import scientist from '../../../images/Scientist.png';

const ScientistsWin = () =>
  <Row className='scientist-win'>
    <br></br>
    <h1>The Scientists Have Prevailed!</h1>
    <br></br>
    <Row>
      <Col md={4} xs={2}></Col>
      <Col md={4} xs={8}>
        <Image src={scientist} responsive></Image>
      </Col>
      <Col md={4} xs={2}></Col>
    </Row>
      <h3>The World Is Safe!</h3>
  </Row>

export default ScientistsWin;