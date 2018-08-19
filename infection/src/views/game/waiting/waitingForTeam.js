import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Waiting from './waiting';


const WaitingForTeam = () => 
    <Row>
      <Col med={2}></Col>
      <Col med={8}>
        <Waiting></Waiting>
      </Col>
      <Col med={2}></Col>
    </Row>
 
  


export default WaitingForTeam;