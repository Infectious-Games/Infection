import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';

import infiltratorsWin from '../../../images/infiltrator.png';

const InfiltratorsWin = () => (
  <Row className="infiltrators-win">
    <br />
    <h1>The Infiltrators Have Won!</h1>
    <br />
    <Row>
      <Col md={4} xs={2} />
      <Col md={4} xs={8}>
        <Image src={infiltratorsWin} responsive />
        <h3>The World Is In Peril!</h3>
      </Col>
      <Col md={4} xs={2} />
    </Row>
    <h3>Humanity Is Doomed.</h3>
  </Row>
);

export default InfiltratorsWin;