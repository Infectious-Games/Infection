import React from 'react';
import { Image, Grid, Row } from 'react-bootstrap';

import InfiltratorList from './infiltratorList';
import infiltrator from '../../../../images/Infiltrator-Card.png';

const Infiltrator = ({ infiltrators }) => 
  <Grid>
    <Row>
      <Image src={infiltrator} responsive></Image>
    </Row>
    <Row>
      <InfiltratorList infiltrators={infiltrators}></InfiltratorList>
    </Row>
  </Grid>

  export default Infiltrator;
  