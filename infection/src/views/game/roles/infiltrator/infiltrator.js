import React from 'react';
import { Image, Grid, Row, Col } from 'react-bootstrap';

import InfiltratorList from './infiltratorList';
import infiltrator from '../../../../images/infiltrator.png';

const Infiltrator = ({ infiltrators }) => 
  <Row className='infiltrator'>
    <br></br>
    <h4>YOU'VE INFILTRATED THE TASK FORCE!</h4>
    <Row>
      <Col md={4} xs={2}></Col>
      <Col md={4} xs={8}>
        <Image src={infiltrator} responsive></Image>
        <h1 className='infiltrator-title'>INFILTRATOR</h1>
      </Col>
      <Col md={4} xs={2}></Col>
    </Row>
    <Col md={1} xs={0}></Col>
    <Col md={5} xs={6}>
      <h4>YOUR OBJECTIVES:</h4>
      <ul>
        <li>Sabotage Missions</li>
        <li>Remain Undiscovered</li>
        <li>Spread Discord Within taskforce</li>
      </ul>
    </Col>
    <Col md={5} xs={6}>
      <InfiltratorList infiltrators={infiltrators}></InfiltratorList>
    </Col>
    <Col md={1} xs={0}></Col>
  

  </Row>
  export default Infiltrator;
  