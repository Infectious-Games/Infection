import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

import Header from '../game/shared/header';
import Clearance from './clearance';
import JoinGame from './joinGame';

const Dashboard = ({
  game, 
  username, 
  wins, 
  losses, 
  clearance, 
  handleChange, 
  handleSubmit, 
}) =>
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
          <ListGroupItem>Wins: {wins}</ListGroupItem>
          <ListGroupItem>Losses: {losses}</ListGroupItem>
        </ListGroup>
      </Row>
      </Col>
      <Col med={2}></Col>
    </Row>
      <Row>
        <Col med={1}></Col>
        <Col med={4}></Col>
        <Col med={2}></Col>
        <Col med={4}>
          <JoinGame
            game={game}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          >
          </JoinGame>
        </Col>
        <Col med={1}></Col>
      </Row>
  </Grid>

export default Dashboard;