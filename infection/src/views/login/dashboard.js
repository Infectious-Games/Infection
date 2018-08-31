import React from 'react';
import { Grid, Row, Col, Image, Media } from 'react-bootstrap';

import Clearance from './clearance';
import JoinGame from './joinGame';
import StartGame from './startGame';
import Logout from './logout';
import id from '../../images/id_bg.png';

const Dashboard = ({
  activatePal,
  clearance,
  game,
  gamesPlayed,
  handleChange,
  handleSubmit,
  losses,
  newGame,
  photo,
  setNumOfPlayers,
  username,
  wins,
}) => (
  <Grid className="dashboard">
    <Col md={2} xs={0} />
    <Col md={8} xs={12} className="user-id-card">
      <Row>
        <Row className="user-id-card">
          <Image src={id} />
        </Row>
        <Row>
          <Col md={1} />
          <Col md={10}>
            <Clearance clearance={clearance} />
            <Media className="user-info">
              <Media.Left align="middle">
                <img width={300} height={300} src={photo} alt="thumbnail" />
              </Media.Left>
              <Media.Body>
                <h3>Name: {username}</h3>
                <h3>Games Played: {gamesPlayed}</h3>
                <h3>Wins: {wins}</h3>
                <h3>Losses: {losses}</h3>
              </Media.Body>
            </Media>
          </Col>
          <Col md={1} />
        </Row>
      </Row>
      <Row className="start-game">
        {newGame ? (
          <Row>
            <br />
            <h4 className="game-code">Game Code: {newGame}</h4>
          </Row>
        ) : (
          <StartGame
            activatePal={activatePal}
            setNumOfPlayers={setNumOfPlayers}
          />
        )}
      </Row>
      <Row className="join-game">
        <JoinGame
          game={game}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Row>
      <Row className="logout">
        <Logout />
      </Row>
    </Col>
    <Col md={2} xs={0} />
    <br />
  </Grid>
);

export default Dashboard;
