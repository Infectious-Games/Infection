import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';

import Waiting from '../waiting/waiting';


const NotLeader = ({ leader }) => 
  <Grid>
    <Row>
      <Col med ={12}>
        <h2>{leader} is Leader not You Womp Womp!</h2>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <h3>Try to Influence Your Leader's Choice for Mission Roster</h3>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <Waiting></Waiting>
      </Col>
    </Row>
  </Grid>

export default NotLeader;