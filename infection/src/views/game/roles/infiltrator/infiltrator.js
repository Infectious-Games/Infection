import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';

import InfiltratorList from './infiltratorList';
import infiltrator from '../../../../images/infiltrator.png';

const Infiltrator = ({ infiltrators }) => 
  <Row className='infiltrator'>
    <br></br>
    <h4>YOU'VE INFILTRATED THE TASK FORCE!</h4>
    <Row>
      <Col md={4} xs={2}></Col>
      <Col md={4} xs={8}>
        <Image
          width={125} 
          height={150}//if setting dimsions image cannot be responsive
          src={infiltrator} 
          // responsive
        ></Image>
        <h2 className='infiltrator-title'>INFILTRATOR</h2>
        <h5>YOUR OBJECTIVES:</h5>
        <ul>
          <li>Sabotage Missions</li>
          <li>Remain Undiscovered</li>
          <li>Spread Discord</li>
        </ul>
        <InfiltratorList infiltrators={infiltrators}></InfiltratorList>
      </Col>
      <Col md={4} xs={2}></Col>
    </Row>
  </Row>
  export default Infiltrator;
  