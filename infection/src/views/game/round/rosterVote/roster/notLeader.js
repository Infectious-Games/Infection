import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import Waiting from '../../../waiting/waiting';


const NotLeader = ({ leader }) => 
  <Grid>
    <Row>
      <Col md={8}>
        <h1>{leader} is Leader not You Womp Womp!</h1>
        <h4>Try to Influence Your Leader's Choice for Mission Roster</h4>
        <Waiting></Waiting>
      </Col>
    </Row>
  </Grid>

export default NotLeader;