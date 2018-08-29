import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Waiting from '../../../waiting/waiting';


const NotLeader = ({ leader }) => 
  <Row>
    <h2>{leader} Is The Current Leader.</h2>
    <Col md={2}></Col>
    <Col md={8}>
      <h4>Try To Influence Your Leader's Choice For Mission Roster</h4>
      <Waiting></Waiting>
    </Col>
    <Col md={2}></Col>
  </Row>

export default NotLeader;