import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import Waiting from '../waiting/waiting';


const NotOnMission = () => 
  <Grid>
    <Row>
      <Col md={8}>
        <h2>You Were Not Selected for This Mission!</h2>
        <h3>Stand By for Mission Result</h3>
        <Waiting></Waiting>
      </Col>
    </Row>
  </Grid>
  
export default NotOnMission;