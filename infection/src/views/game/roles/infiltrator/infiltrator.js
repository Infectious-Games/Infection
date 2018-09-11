import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';

import InfiltratorList from './infiltratorList';
import infiltrator from '../../../../images/gasmask-alt-2.png';

const Infiltrator = ({ infiltrators }) => (
  <Row className="infiltrator">
    <br />
    <h4>YOU HAVE INFILTRATED THE TASK FORCE</h4>
    <Row>
      <Col md={4} xs={2} />
      <Col md={4} xs={8}>
        <Image
          width={125}
          height={150} // if setting dimensions image cannot be responsive
          src={infiltrator}
          // responsive
          // class="img-responsive center-block"
        />
        <h2 className="infiltrator-title">INFILTRATOR</h2>
        <h5>YOUR OBJECTIVES:</h5>
        <div alignContent="middle">
          <p>• Sabotage Missions</p>
          <p>• Remain Undiscovered</p>
          <p>• Spread Discord</p>
        </div>
        <InfiltratorList infiltrators={infiltrators} />
      </Col>
      <Col md={4} xs={2} />
    </Row>
  </Row>
);
export default Infiltrator;
