import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

import Header from '../game/shared/header';
import Clearance from './clearance';
import JoinGame from './joinGame';
import StartGame from './startGame';
import Logout from './logout';

const Dashboard = ({
  game,
  username,
  wins,
  losses,
  clearance,
  handleChange,
  handleSubmit,
  setNumOfPlayers,
  newGame,
  activatePal,
}) => (
  <Grid>
    <br />
    <Row>
      <Header />
    </Row>
    <br />
    <Row>
      <Col md={2} />
      <Col md={8}>
        <Row>
          <ListGroup>
            <ListGroupItem>
              <Clearance clearance={clearance} />
            </ListGroupItem>
            <ListGroupItem>
              Username:
              {username}
            </ListGroupItem>
            <ListGroupItem>
              Wins:
              {wins}
            </ListGroupItem>
            <ListGroupItem>
              Losses:
              {losses}
            </ListGroupItem>
          </ListGroup>
        </Row>
      </Col>
      <Col md={2} />
    </Row>
    <Row>
      <Col md={1} />
      <Col md={5}>
        {newGame ? (
          <Row>
            Game Code:
            {newGame}
          </Row>
        ) : (
          <StartGame
            activatePal={activatePal}
            setNumOfPlayers={setNumOfPlayers}
          />
        )}
      </Col>
      <Col md={5}>
        <JoinGame
          game={game}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Col>
      <Col md={1} />
    </Row>
    <br />
    <br />
    <Logout />
  </Grid>
);

export default Dashboard;
