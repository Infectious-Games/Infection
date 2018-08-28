import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';

import infiltratorsWin from '../../../images/infiltrator.png';

const InfiltratorsWin = () =>
  <Row className='infiltrators-win'>
    <br></br>
    <h1>The Infiltrators Have Won!</h1>
    <br></br>
    <Row>
      <Col md={4} xs={2}></Col>
      <Col md={4} xs={8}>
        <Image src={infiltratorsWin} responsive></Image>
        <h3>The World Is In Peril!</h3>
      </Col>
      <Col md={4} xs={2}></Col>
    </Row>
      <h3>Humanity Is Doomed.</h3>
  </Row>
  

export default InfiltratorsWin;