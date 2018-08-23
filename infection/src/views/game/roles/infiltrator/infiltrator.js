import React from 'react';
import { Image, Grid, Row, Col } from 'react-bootstrap';

import InfiltratorList from './infiltratorList';
import infiltrator from '../../../../images/Infiltrator-Card.png';

const Infiltrator = ({ infiltrators }) => 
  <Grid>
    <Row>
      <Col md={8}>
        <Row>
          <Image src={infiltrator} responsive></Image>
        </Row>
        <Row>
          <InfiltratorList infiltrators={infiltrators}></InfiltratorList>
        </Row>
      </Col>
    </Row>
  </Grid>

  export default Infiltrator;
  