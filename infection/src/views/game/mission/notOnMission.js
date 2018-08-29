import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Waiting from '../waiting/waiting';


const NotOnMission = () => 
  <Row>
    <h3>You Are Not On The Mission</h3>
    <h4>Stand By for Mission Result</h4>
    <Col md={2}></Col>
    <Col md={8}>
      <Waiting></Waiting>
    </Col>
    <Col md={2}></Col>
  </Row>
  
export default NotOnMission;