import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

import Header from '../game/shared/header';
import Clearance from './clearance';
import JoinGame from './joinGame';
import StartGame from './startGame';

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
    <br></br>
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <Row>
          
        </Row>

        <Row>
          <ListGroup>
            <ListGroupItem>
              <Clearance clearance={clearance}></Clearance> 
            </ListGroupItem>
            <ListGroupItem>Username: {username}</ListGroupItem>
            <ListGroupItem>Wins: {wins}</ListGroupItem>
            <ListGroupItem>Losses: {losses}</ListGroupItem>
          </ListGroup>
        </Row>

      </Col>
      <Col md={2}></Col>
    </Row>

    <Row>
    </Row>
    <Row>
      <Col md={1}></Col>
      <Col md={5}>
        <StartGame></StartGame>
      </Col>
      <Col md={5}>
        <JoinGame
          game={game}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        >
        </JoinGame>
          </Col>
        <Col md={1}></Col>
    </Row>

  </Grid>

export default Dashboard;