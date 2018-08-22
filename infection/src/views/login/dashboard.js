import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

import Header from '../game/shared/header';
import Clearance from './clearance';

const Dashboard = ({ username, handle, wins, losses, clearance }) =>
  <Grid>
    <Row>
      <Header></Header>
    </Row>
    
    <Row>
      <Col med={2}></Col>
      <Col med={8}>
        <Clearance clearance={clearance}></Clearance>
      <Row>
        <ListGroup>
          <ListGroupItem>Username: {username}</ListGroupItem>
          <ListGroupItem>Handle: {handle}</ListGroupItem>
          <ListGroupItem>Wins: {wins}</ListGroupItem>
          <ListGroupItem>Losses: {losses}</ListGroupItem>
        </ListGroup>
      </Row>
      </Col>
      <Col med={2}></Col>
    </Row>
  </Grid>

export default Dashboard;