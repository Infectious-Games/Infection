import React from 'react';
import { Image, Col, Row } from 'react-bootstrap';

import scientist from '../../../images/Scientist.png';

const Scientist = () => 
<Row className='scientist'>
  <br></br>
  <h4>YOU'VE BEEN ADDED TO THE TASK FORCE!</h4>
  <Col md={4} xs={2}></Col>
  <Col md={4} xs={8}>
    <Image src={scientist} responsive></Image>
    <h1 className='scientist-title'>SCIENTIST</h1> 
    <h3>YOUR OBJECTIVES:</h3>
    <ul>
      <li>Administer Cure</li>
      <li>Contain Outbreaks</li>
      <li>Uncover Infiltrators</li>
    </ul>
  </Col>
  <Col md={4} xs={2}></Col>
</Row>
export default Scientist;
  