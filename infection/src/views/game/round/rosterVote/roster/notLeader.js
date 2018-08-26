import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import Waiting from '../../../waiting/waiting';


const NotLeader = ({ leader }) => 
  <Grid>
    <Row>
      <Col md={8}>
        <h1>{leader} Is The Current Leader.</h1>
        <h4>Try To Influence Your Leader's Choice For Mission Roster</h4>
        <Waiting></Waiting>
      </Col>
    </Row>
  </Grid>

export default NotLeader;